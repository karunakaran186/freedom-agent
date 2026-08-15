import type { IncomingMessage, ServerResponse } from 'http';

/**
 * Vercel Serverless Function: GET /api/health
 * Pure Node.js http (IncomingMessage, ServerResponse) - Zero Express dependency.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({
    status: 'ok',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString()
  }));
}
