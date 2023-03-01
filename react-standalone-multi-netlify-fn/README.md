# React Standalone w/ multiple node serverless functions

Being more true to life for a netlify site,
this uses a standalone react app to deploy and uses @nrwl/node to generate two projects (modifed app gen) to the functions/ directory.

The changes to make the functions work with netlify are the same as the node standalone which is to set `"bundle": true` and to output to the 'same' directory since both projects are nested into the 'functions' directory we can just tell netlify to look in 'dist/functions' instead of forcing a similar project name of the react app like before in the node standalone example.

the does require the `main` executor option to point to a unique file name since the file names will be the name of the serverless function.

Since the react app is our main 'host' app we can just simple add the functions as implicit deps of the app so when deploying the app the functions are properly built into `dist/functions` where netlify.toml is set to look at.

We have to change the port that vite dev server starts on for `netlify dev` command, but not important here.

this mental model works better with the netlify assumptions unlike the node standlone model where adding multiple functions could be more tricky to corrdinate, but when building to netlify the approching of having this 'host' app will be more likely.
