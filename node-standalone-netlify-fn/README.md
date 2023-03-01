# Stand alone node repo

This repo is essentually a single serverless function for netlify

the src/main.ts is the entrypoint and since netlify uses the names of the files to be the name of the function, the function will be named 'main'
i.e. https://<domain-name>/.netlify/functions/main

the could be renamed to be the name of the generated project to better help folks as well.

2 big important things is 1 the esbuild bundling options needs to be turned on because the output without it causes runtime issues for netlify

```
Runtime.HandlerNotFound: main.handler is undefined or not exported
    at Object.UserFunction.js.module.exports.load (file:///var/runtime/index.mjs:1034:15)
    at async start (file:///var/runtime/index.mjs:1194:23)
    at async file:///var/runtime/index.mjs:1200:1
```

maybe something to look at, but also functions being bundled is more useful IMO anyways.

Next the configurations within the netlify.toml file.

mainly 2 options will need to be set.

the build.publish option is required to run `netlify deploy`

it just has to be a directory in which exists. it makes sense to make it the output of the serverless function, even though it won't be used via netlify since the build.publish is for the static file options.

Netlify doesn't have the concept of `deploy --only functions` as each deploy is atomic and contains the full 'site' where site is a given netlify site/publish website with a domain name. Netlify doesn't require static content to successfully deploy the app. i.e. if there is no index.html there the site won't error.

Next option is needing to set which directory the is the published function directory.

functions.directory

this would be the parent folder of the build .js file. i.e. `dist/<project-name>`

focusing on standalone this is fine to set in the root level netlify toml file. but if there are multiple netlify apps within a given workspace then there will need to be extra configurations with multiple netlify.toml files to property set options as needed.

see more here: https://docs.netlify.com/configure-builds/monorepos/

from the initial docs it seems to only assume the full apps code will be contained within a single nested directory instead of sharing across the monorepo? Needs more investigations

Another thing to note is if there are multiple functions generated for a given workspace and they all deploy to the same netlify site, then the output of the build target will need to be within the same folder.
i.e.
nx build function-one -> dist/my-site/function-one.js
nx build function-two -> dist/my-site/function-two.js

if only 1 function is 'affected', and therefore is deployed then the other function is implcitly deleted.
so all functions will need to be built regardless of which ones are affected. this is more simple if there is a 'host' app that is using these functions, where the app can be setup to implcitly depend on the functions.

another approach would be if the 'functions' project contains multiple functions that should all be deployed together, in which case the mapping is 1 nx project to 1 netlify site vs multiple nx projects to 1 netlify site.

but this might only be a netlify situation so maybe only extra docs are needed around this front.
