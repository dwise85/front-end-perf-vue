# Vue Performance App

![image](https://user-images.githubusercontent.com/2475800/63406279-43b9a600-c39e-11e9-853f-826c7972ccb9.png)
![image](https://user-images.githubusercontent.com/2475800/63406324-6481fb80-c39e-11e9-9842-10b759a2e5fb.png)

## Simple Vue.js based app built to test performance
> The overall goal here was to build a PWA with Vue and make it as fast as possible utilizing base design patterns and architecture that will scale well as the application grows.
>
> To achieve this the tooling is highly focused around:
>> - [Webpack v4](https://webpack.js.org/) build system and ensuring the webpacks produced by the source code are lazily loaded and as trim as possible. A slew of various plugins were used to help optimize and automate where ever possible.
>> - [VSCode](https://code.visualstudio.com/) was used as the primary IDE and basic configuration is provided to make it easier using this project.
>> - [Typescript v3](https://www.typescriptlang.org/) was utilized for compile time checks for typings that help enforce linting and catching potential runtime bugs. Do note, the app as it was designed does not support older browsers like IE and opted out of utilizing any polyfills for backwards compatibility.
>> - [Workbox v4](https://developers.google.com/web/tools/workbox/) was utilized with webpack to auto generate a service worker based on our compiled bundles, runtime remote resources, and assets. This helped reduce boiler plate code for the service worker and works well for the needs of optimizing our client performance.
>> - [Vue.js v2, VueX, and Vue-Router](https://vuejs.org/) with its [SFC](https://vuejs.org/v2/guide/single-file-components.html#ad) (Single File Component) pattern was used to for the client rendering stack with focus on trying to keep all the modules lazyily and hot loadable. The rendering components are also loosely coupled with the store.
>> - A core logic layer was used to keep cross cutting service creation leaking into the rendering and store stacks and are passed through via Vue's Provider/Inject pattern globally. The core provides a layer of abstraction where the internal stacks no longer need to care on implementation details and cross cutting services can be created and consumed with very little direct spill into the consuming layers.

## High Level Architecture Breakdown
- Providers - The core cross cutting services that do not contain state. This package is lazy loaded based on environment and will generate correct implementations for the caller as needed. This pattern guarantees loose coupling from the other layers and ensures implementations could be swapped out depending on environment (such as node, workers, etc).
- Rendering - The full rendering support stack.
  - Common - Everything here is designed in such a way it is loosely coupled from the usage scenario and is meant to be re-used anywhere as needed.
    - Components - Common components that pages could re-use as they are made somewhat generic.
    - Layout - Common layout specific components that control routing and may always be visible to the user. These can be re-used and are not page specific.
    - Stores - Store modules that mostly encapsulate business logic and state of the app. We use VueX for its cohesiveness with  Vue.js, but the store is somewhat wrapped (I could do better but its some protection) so with some work another store implementation could be used. These store modules are designed to be created and destroyed to support the specific rendering components that need access to them as a view model.
  - Initialization - Specific routines that are orchestration specific to the rendering stack. Since these do create some tight coupling, its important to keep the orchestration slim.
  - Pages - These are the primary entry points of the app and allow us to specifically focus our webpack bundling efforts and tear down around what ultimately the user will view immediately on a page. A page could also be a dialog or modal as well (or an additional folder could be introduced for this purpose). Think of a page as an encapsualted rectangle that lazy loads all of its resources as needed when the user views them.
  - Types - To keep loose coupling between folder structure and ensuring web pack doesn't pull in more than what is needed for packs, put common interfaces here instead of with the folders of the implementation (unless the typing is coupled with the implementation where they go hand in hand).
  - Utils - We have various utilities for various things located here including testing, dev (webpack and hot module stuff), and runtime capabilities. Its important that utilities are stateless functions and provide functional utility only.

## Further optimizations/improvements to be made:
- The Vue's [runtime compiler](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only) is still in use in this library but I have intention to rip it our to save 30% on the bundle size and likely improve rendering performance further.
- The CSS is not optimized in such a way that critical CSS is front loaded and the non critical CSS is preloaded after.
- I intend to make a library to spawn web worker to help with certain heavy rendering performance (such as processing images) which will help in heavy operations.

## Results (as of V1.0)
Out of the box this app passes Chrome performance audit tool as 99% and has a first paint with no cache in 1.3 seconds and is interactive in 2.2 seconds. There is still optimizations to be made to the CSS being downloaded as that bundle is rather large and has a syncrhonous parse.
![image](https://user-images.githubusercontent.com/2475800/63365443-7f1b8c80-c32c-11e9-9dd2-0a53efd274d9.png)

The whole app bundles down to 68.88 Kb Gzipped (207.15 Kb parsed). Vendor bundle consumeds 45.3 Kb of the whole bundle (mostly Vue.js and its' dependencies). We can optimize here further by cutting out the need for the runtime compiler on Vue.
![image](https://user-images.githubusercontent.com/2475800/63365671-ea655e80-c32c-11e9-88f1-ac30ae98bfd3.png)
![image](https://user-images.githubusercontent.com/2475800/63365728-09fc8700-c32d-11e9-890d-ed19834dd64e.png)

## Build Setup

Please refer to package.json for available build commands that can be run with 'npm run ...' or 'yarn ...'.
