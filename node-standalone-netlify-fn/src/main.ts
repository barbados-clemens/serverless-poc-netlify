import { Handler, HandlerContext } from '@netlify/functions';

export const handler: Handler = async (event, context: HandlerContext) => {
  const { name = 'stranger' } = event.queryStringParameters;
  console.log({ name, now: Date.now(), whoami: context.functionName });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
    }),
  };
};
