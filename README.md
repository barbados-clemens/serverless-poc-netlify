# Serverless PoC

Proof of concepts for various serverless approaches with nx + node/deno

the main take away is how the netlify mental model is supposed to fit within the Nx mental model.

Traditionally with Netlify, you would deploy an Nx app (+ any bundled projects/deps) to a Netlify 'site'.
But with edge functions, the mental model shifts a little bit. As you can still do the same thing as before.
Adding serverless/edge functions to an existing Netlify site (Nx app), but you can also deploy functions without an app (though netlify still asked for a directory to upload that would be the site). This can be a bit odd esp when you're deploying say 3 serverless functions to netlify that don't inner depend with each other.

So now you need to run 3 builds to deploy the functions to netlify. i.e. `nx run-many --target=build functions-*` assuming all functions.
Since netlify assumes you're deploying a single site, you have to output all of these into the same output folder. If the projects are at the root level this makes it a little odd.
i.e.

```tree
function-one/
function-two/
function-three/
```

now all of those projects needs to have their configurations changed to output into the `dist/functions/` directory, and should only cache itself and not any extra of the items within that directory.

if the projects are all contains within a parent folder then this is a bit more 'simpler',
i.e.

```tree
functions/
  one/
  two/
  three/
```

as you can let netlify know you only care about the `dist/functions` directory, and the projects will be built into `dist/functions` already.
and netlify doesn't seem to care about the nesting of other directories. Also, the bundle executor option needs to be set to true otherwise runtime errors from netlify
i.e.

```tree
dist/
  functions/
    one/
      one.js # file name has to match folder name
    two/
      two.js
    three/
      three.js
```

But netlify _does_ care about nesting for _edge_ functions.
these require the output to be flag with the file names dictating the edge functions name.

i.e. the output should be

```tree
dist/
  edge-functions/
    one.js (or ts or tsx/jsx if doing SSR stuff)
    two.js
    three.js
```

Netlify serverless and edge functions can both be used at the same time.
the configurations look something like

```toml

[build]
  # netlify requires a publish directory even if you're not publishing a website i.e. react app
  publish="dist/some empty directory if no site is used/"
  command="npx nx build" # some build command for site or could be a run-many to build all functions
  # custom edge functions directory
  edge_functions = "dist/edge-functions/"
[functions]
  # custom directory for node serverless functions
  directory="dist/functions/"

# edge function configs
[[edge_functions]]
  function = "hello-geo" # expects 'dist/edge-functions/hello-geo.ts|js' to exist
  path = "/api/geo"

[[edge_functions]]
  function = "app" # expects 'dist/edge-functions/app.ts|js' to exist
  path = "/"
```

deploying multiple netlify sites within a repo is a bit more complex as there is a root netlify.toml and then each nested proejct will contain project specific things for that specific app. i.e. build command.
[more netlify monoreo info](https://docs.netlify.com/configure-builds/monorepos/)

when deploying a webapp + serverless functions to netlify, you can make the webapp implcility depend on the edge functions if so desired so then running `nx build webapp` will build the serverless/edge functions as well.

for DX folks will have to run `netlify dev` to spin up the functions and the webapp together, which isn't that bad.
BUT if no web app then they'll need to build the serverless/edge functions, then run `netlify dev` since netlify will only look in the output for those functions. so a custom nx watch command might be needed to make Dx better there.

Also you cannot partially deploy some functions and not others. if the function isn't in the output netlify assumes you've deleted it and will remove it from the deployed site, so all functions have to be build every time you want to publish. this leads to potentially only using 1 project instead of multiple for edge functions pretty convencing since you can point netlify directly to the source ts files and not worry about building/bundling. but with serverless most likely still want to build and bundle so less likely needed in that case, but have to make sure the build, builds all functions for that site.

lastly the actual publish commands is pretty simple, though idk how many will publish via nx or just leave it up to the git integration to do it.

but the target is simply

```json
"deploy": {
    "command": "npx netlify deploy" // optional --build flag if they also need to run the build command first for netlify
  }
```

This will make a deploy preview and then can be promoted to the production deploy after review if so desired.

Expanded with configurations for direct prod publish

```json
    "deploy": {
      "dependsOn": ["build"], // maybe not needed if netlify runs the defined build command
      "executor": "nx:run-commands",
      "options": {
        "command": "netlify deploy --build --context deploy-preview"
      },
      "configurations": {
        "production": {
          "command": "netlify deploy --prod --build --context production" // there is also --prod-if-unlocked in case prod deployments are 'locked'
        }
      }
    }
```

The following are a couple examples of using netlify and serverless/edge functions that contain more notes on the specific implmentation.
they aren't very structured. more of stream of thought but might be helpful

## node-standalone-netlify-fn

A node-standalone preset to build and deploy a single serverless function to netlify

## react-standalone-multi-netlify-fn

A react-standalone project with multiple serverless functions deployed to netlify.

## deno-standalone-netlify-edge-fn/

a deno standalone app with only edge functions

# react-standalone-deno-edge-fn/

a react standalone using multiple edge functions (via seperate projects)
