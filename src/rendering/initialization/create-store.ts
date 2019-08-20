import { ICore } from "@providers";
import { isDev } from "@rutils";
import Vue from "vue";
import Vuex, { Store } from "vuex";

// @ts-ignore below line as parameter core may sometimes be unused
export const createStore = (core: ICore): Store<any> => {
  Vue.use(Vuex);

  const store = new Vuex.Store({
    strict: isDev
  });

  /** WEBPACK_STRIP:start */
  if (module.hot) {
    module.hot.accept(["../common/stores/lists"], () => {
      const listStore: any = require("../common/stores/lists").store;
      store.hotUpdate({
        modules: {
          [listStore.storeKey]: listStore.generateStore(core)
        }
      });
    });
  }
  /** WEBPACK_STRIP:end */

  return store;
};
