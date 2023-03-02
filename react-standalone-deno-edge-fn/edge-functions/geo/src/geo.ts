import { Context } from 'https://edge.netlify.com';

export default async (request: Request, context: Context) => {
  // Here's what's available on context.geo

  // context: {
  //   geo: {
  //     city?: string;
  //     country?: {
  //       code?: string;
  //       name?: string;
  //     },
  //     subdivision?: {
  //       code?: string;
  //       name?: string;
  //     },
  //   }
  // }

  console.log('geo');
  return Response.json({
    geo: context.geo,
    message: 'INCLUDE_TITLE',
    header: request.headers.get('x-nf-geo'),
  });
};
