import { ICore } from "@providers";
import { ActionContext, Module } from "vuex";

/** A Store Module that can be registered with the central app store. */
export interface IStoreModule<S = any, R = any> extends Module<S, R> {
  name?: string;
}

/** Store context used for operating on the store. */
export interface IStoreContext<S = any, R = any> extends ActionContext<S, R> {
  name?: string;
}

/**
 * Keys used to access specific mutators, getters, or actions on the store
 * (with namespaces already defined).
 */
export interface IStoreKeys {
  [key: string]: string;
}

/** Specification to define to create a store module. */
export interface IStoreModuleCreator<T = IStoreKeys>
  extends IComponentStoreModule<T> {
  generateStore: (core: ICore) => IStoreModule;
}

/**
 * Interface used for basic operations on the central store to utilize
 *  functions from this module that have been registered.
 */
export interface IComponentStoreModule<T = IStoreKeys> {
  storeKey: string;
  accessKeys: T;
}
