import { NextApiRequest, NextApiResponse } from 'next';

// Rate Limiting
export const rateLimit = (handler: any, limit: number, period: number) => {
  let lastCalledTime = 0;
  let blocked = false;
  let counter = 0;

  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (blocked) {
      res.status(429).send('Too many requests');
    } else {
      const now = Date.now();
      if (now - lastCalledTime > period) {
        lastCalledTime = now;
        counter = 0;
        await handler(req, res);
      } else {
        counter++;
        if (counter >= limit) {
          blocked = true;
          const timeLeft = period - (now - lastCalledTime);
          setTimeout(() => {
            blocked = false;
            lastCalledTime = Date.now();
            counter = 0;
          }, timeLeft);
          res.status(429).send('Too many requests');
        } else {
          await handler(req, res);
        }
      }
    }
  };
};
