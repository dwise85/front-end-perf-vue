// NOTE: This entire file is stripped out of production builds to ensure our production packs are optimally bundled.
/** WEBPACK_STRIP:start */
import Vue, { Component } from "vue";
import * as api from "vue-hot-reload-api";

/** Utilizes vue-hot-reload-api to ensure component is hot reloaded on demand. */
export async function makeHotComponent(
  id: string,
  componentLoader: () => Promise<Component>,
  _acceptFunc: void
): Promise<void> {
  if (module.hot) {
    api.install(Vue);
    if (!api.compatible) {
      throw new Error(
        "vue-hot-reload-api is not compatible with the version of Vue you are using."
      );
    }

    const loadedComponent = await componentLoader();
    api.createRecord(id, loadedComponent);
  }
}

export function reload(id: string, component: Component): void {
  api.reload(id, component);
}
/** WEBPACK_STRIP:end */
