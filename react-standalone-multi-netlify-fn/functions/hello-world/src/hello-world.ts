import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const name = event.queryStringParameters?.name || 'stranger';
  console.log({ name, now: Date.now(), whoami: context.functionName });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
    }),
  };
};
