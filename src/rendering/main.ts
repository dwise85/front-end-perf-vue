/** WEBPACK_STRIP:start */
import { makeHot, reload } from "@dev-utils";
/** WEBPACK_STRIP:end */
import { CoreEnvironment, generateCore } from "@providers";
import { isDev } from "@rutils";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import Vue from "vue";
import { createRouter, createStore } from "./initialization";
import "./main.scss";

const main = async (): Promise<void> => {
  const navbarComponent = (): Promise<any> =>
    import(/* webpackChunkName: 'navbar' */ "@layout").then(
      ({ NavbarComponent }) => NavbarComponent
    );

  /** WEBPACK_STRIP:start */
  if (isDev && module.hot) {
    const navbarModuleId = "./rendering/common/layout/navbar";

    // first arguments for `module.hot.accept` and `require` methods have to be static strings
    // see https://github.com/webpack/webpack/issues/5668
    makeHot(
      navbarModuleId,
      navbarComponent,
      module.hot.accept(navbarModuleId, () =>
        reload(navbarModuleId, require("@layout").NavbarComponent)
      )
    );
  }
  /** WEBPACK_STRIP:end */
  if (!isDev && "serviceWorker" in navigator) {
    // Is prod
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/service-worker.js");
    });
  }

  const core = await generateCore({ environment: CoreEnvironment.BrowserApp });

  Vue.config.devtools = isDev;

  new Vue({
    el: "#app-main",
    router: createRouter(),
    store: createStore(core),
    components: {
      navbar: navbarComponent
    },
    provide: () => ({
      core
    })
  });
};

void main();
