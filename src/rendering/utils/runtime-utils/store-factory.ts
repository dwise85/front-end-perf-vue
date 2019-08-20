import { ICore } from "@providers";
import {
  IComponentStoreModule,
  IStoreModule,
  IStoreModuleCreator
} from "@rtypes";
import { unWrapError } from "@rutils";

/** Wrapper type to ensure a slightly looser coupling with the store being used. */
interface ICentralStore {
  state: any;
  registerModule: (storeName: string, store: IStoreModule) => void;
  unregisterModule: (storeName: string) => void;
}

/** Indicates supported lazy loaded stores. */
export enum StoreType {
  Lists = "lists"
}

const lazyStoreFactory = (type: StoreType): Promise<IStoreModuleCreator> => {
  switch (type) {
    case StoreType.Lists:
      return import(
        /* webpackChunkName: "listsStore" */ "../../common/stores/lists"
      ).then(loadModule => loadModule.store);
    default:
      throw new Error(
        "No loader is present to lazy load specified store in lazyStoreFactory!"
      );
  }
};

/**
 * Allows for lazy loading a store module as a seperate web pack, on demand and generically
 * to the source. The store will be loaded and registered with the store given.
 */
export const registerStoreLazy = (
  type: StoreType,
  core: ICore,
  centralStore: ICentralStore
): Promise<IComponentStoreModule> => {
  return lazyStoreFactory(type)
    .then((store: IStoreModuleCreator) => {
      if (!(store.storeKey in centralStore.state)) {
        centralStore.registerModule(store.storeKey, store.generateStore(core));
      }
      return store;
    })
    .catch(error => {
      const logger = core.getLogger("registerStore");
      logger.error(`Hit error lazy loading store: ${unWrapError(error)}`);
      throw error;
    });
};

/** Synchronous registering of a module from the given store. */
export const registerStore = (
  store: IStoreModuleCreator,
  core: ICore,
  centralStore: ICentralStore
): void => {
  if (!(store.storeKey in centralStore.state)) {
    centralStore.registerModule(store.storeKey, store.generateStore(core));
  }
};

/** Unregister a store module from the store. */
export const unRegisterStore = (
  storeKey: string,
  centralStore: ICentralStore
): void => {
  if (storeKey in centralStore.state) {
    centralStore.unregisterModule(storeKey);
  }
};
