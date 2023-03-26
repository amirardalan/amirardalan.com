import { NextApiRequest, NextApiResponse } from 'next';

// /api/middleware
const rateLimit = (handler: any, limit: number, period: number) => {
  const lastCalledTimes = new Map<string, number>();
  const counters = new Map<string, number>();
  let blocked = false;

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const key =
      req.socket.remoteAddress ||
      (req.headers['x-forwarded-for'] as string) ||
      '';
    if (!key) {
      return res.status(400).send('Invalid request');
    }

    if (blocked) {
      res.status(429).send('Too many requests');
    } else {
      const now = Date.now();
      const lastCalledTime = lastCalledTimes.get(key) || 0;
      const counter = counters.get(key) || 0;

      if (now - lastCalledTime > period) {
        lastCalledTimes.set(key, now);
        counters.set(key, 0);
        await handler(req, res);
      } else {
        counters.set(key, counter + 1);
        if (counter >= limit) {
          blocked = true;
          const timeLeft = period - (now - lastCalledTime);
          setTimeout(() => {
            blocked = false;
            lastCalledTimes.delete(key);
            counters.delete(key);
          }, timeLeft);
          res.status(429).send('Too many requests');
        } else {
          await handler(req, res);
        }
      }
    }
  };
};

export default rateLimit;
