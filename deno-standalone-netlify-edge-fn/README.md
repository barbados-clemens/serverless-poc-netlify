# Deno Standalone Edge Fn

this is a hand rolled deno standalone app where the src is the edge functions to deploy to netlify

Netlify requires a publish dir for the 'site' content which isn't preset here. instead we just reprovide the src directory.
this is also the directory for a custom edge function directory options
the edge functions are configured with a path and which function should be invoked, this is via the file name.

```toml
[build]
edge_functions = "src"
publish = "src"

[[edge_functions]]
function = "hello-geo"
path = "/api/geo"
```

edge functions can also be named .tsx/jsx for SSR capabilities.
https://docs.netlify.com/edge-functions/get-started/#edge-functions-with-jsx-or-tsx

Paths can match on wildcards as well.

```toml
[[edge_functions]]
  path = "/blog/*" # for any path matching /blog/<anything> run the 'src/auth.ts' file for the edge function
  function = "auth"
```

functions are processed in order from top to bottom from netlify.toml to inlined first
https://docs.netlify.com/edge-functions/declarations/#declaration-processing-order
