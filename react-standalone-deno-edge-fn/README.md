# React Standalone w/ Multiple Edge Fn

This repo contains a default react standalone app with 3 edge functions written in deno (via the @nrwl/deno) in the `edge-functions` directory.

the edge-functions need to be files within the top level of the defined edge_functions directory,
in order to use the projects per edge_function, the edge functions will need to be bundled and placed next to each other.
or 1 project will need to be the single src of the edge_functions if you don't want to bundle.
3rd option is to provide a 'copy' type feature where the ts and any of it's deps are copied to the dist and then that's used.

either way if bundlings/coping, there needs to be a way to make it easy to watch for changes and rebuild/copy to the edge_functions directory netlify is looking for. (nx watch?)

declaration order of the netlify functions also matter.
for ease of use, definining in the netlify.toml is easier to reason about, but definining in the edge function is also allowed.
but it's harder to reason on the correct order things will run in.

also since the edge functions are named via the file name the generated name of the function entry point should match the project name.

also also, if the direction of using multiple edge function projects built to the same directory, we'll need to update the cache output to make sure it's only the bundled files. if we copy idk what the correct way to do that is, along with the 'copy' idea is the need for moving the import_map and deno.json files as the import_map will contain those alias. built code will already have those resolved.

this also requires building the edge functions first, which can be accomplished via the implicit deps if they are using a single 'host' app being deployed to netlify, but isn't always the case. i.e. an app served via edge_functions.
in which case making sure the graph is configured correct so only 1 command is needed will be something that needs to be documented/explained well for people trying this out.
