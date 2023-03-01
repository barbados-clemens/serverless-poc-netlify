import { Handler, HandlerContext } from '@netlify/functions';

export const handler: Handler = async (event, context: HandlerContext) => {
  const name = event.queryStringParameters?.name || 'stranger';
  console.log({ name, now: Date.now(), whoami: context.functionName });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Goodbye, ${name}!`,
    }),
  };
};
