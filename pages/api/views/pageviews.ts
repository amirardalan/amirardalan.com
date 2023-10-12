import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const jwt = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process?.env?.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});

const ga4Analytics = google.analyticsdata({
  version: 'v1beta',
  auth: jwt,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestBody = {
      property: `properties/${process.env.GOOGLE_ANALYTICS_API_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: '2005-01-02',
          endDate: 'today',
        },
      ],
      metrics: [
        {
          name: 'eventCount',
          expression: 'sessions',
        },
      ],
    };

    const { data } = await ga4Analytics.properties.runReport({
      property: `properties/${process.env.GOOGLE_ANALYTICS_API_PROPERTY_ID}`,
      requestBody,
    });

    const pageviews = data?.rows?.[0]?.metricValues?.[0]?.value ?? 0;

    res.status(200).json(pageviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve pageviews count' });
  }
}
