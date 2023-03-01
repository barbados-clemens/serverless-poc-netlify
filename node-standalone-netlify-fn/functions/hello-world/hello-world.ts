import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  const { name = 'stranger' } = event.queryStringParameters;
  console.log({ name, now: Date.now() });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
    }),
  };
};
