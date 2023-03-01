import type { Context } from 'https://edge.netlify.com';

export default async (request: Request, context: Context) => {
  console.log('start auth');
  request.headers.set('X-Authorization-Custom-Header', 'admin');
};
