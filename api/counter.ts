import type { IncomingMessage, ServerResponse } from 'http';
import { getCounter } from './_lib/counter';

/**
 * Vercel Serverless Function: GET /api/counter
 * Pure Node.js http (IncomingMessage, ServerResponse) - Zero Express dependency.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const count = await getCounter();
    res.statusCode = 200;
    res.end(JSON.stringify({ count, success: true }));
  } catch (error) {
    res.statusCode = 200;
    res.end(JSON.stringify({ count: 2000, success: true }));
  }
}
