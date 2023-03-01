import { Context } from 'https://edge.netlify.com';

export default async (request: Request, context: Context) => {
  console.log('rewrite', request.url);
  // Just return what was requested without transforming it,
  // unless we fnd the query parameter for this demo

  // Get the page content
  const response = await context.next();
  const page = await response.text();

  // Search for the placeholder
  const regex = /INCLUDE_TITLE/i;

  // Replace the content
  const newContent = 'Hello, World!';
  const updatedPage = page.replace(regex, newContent);
  return new Response(updatedPage, response);
};
