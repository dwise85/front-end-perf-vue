/** WEBPACK_STRIP:start */
import { makeHot, reload } from "@dev-utils";
/** WEBPACK_STRIP:end */
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

export const createRouter = (): VueRouter => {
  const homePage = async (): Promise<any> =>
    import(/* webpackChunkName: 'home-page' */ "../pages/home").then(
      ({ HomePage }) => HomePage
    );
  const renderPage = async (): Promise<any> =>
    import(/* webpackChunkName: 'render-page' */ "../pages/render").then(
      ({ RenderPage }) => RenderPage
    );
  const remotePage = async (): Promise<any> =>
    import(/* webpackChunkName: 'remote-page' */ "../pages/remote").then(
      ({ RemotePage }) => RemotePage
    );

  const createRoutes: () => RouteConfig[] = () => [
    {
      path: "/",
      component: homePage
    },
    {
      path: "/render",
      component: renderPage
    },
    {
      path: "/remote",
      component: remotePage
    }
  ];

  /** WEBPACK_STRIP:start */
  if (module.hot) {
    const homeModuleId = "../pages/home";
    const renderModuleId = "../pages/render";
    const remoteModuleId = "../pages/remote";

    // first arguments for `module.hot.accept` and `require` methods have to be static strings
    // see https://github.com/webpack/webpack/issues/5668
    makeHot(
      homeModuleId,
      homePage,
      module.hot.accept(homeModuleId, () =>
        reload(homeModuleId, require("../pages/home").HomePage)
      )
    );

    makeHot(
      renderModuleId,
      renderPage,
      module.hot.accept(renderModuleId, () =>
        reload(renderModuleId, require("../pages/render").RenderPage)
      )
    );

    makeHot(
      remoteModuleId,
      remotePage,
      module.hot.accept(remoteModuleId, () =>
        reload(remoteModuleId, require("../pages/remote").RemotePage)
      )
    );
  }
  /** WEBPACK_STRIP:end */

  Vue.use(VueRouter);

  return new VueRouter({ mode: "history", routes: createRoutes() });
};
