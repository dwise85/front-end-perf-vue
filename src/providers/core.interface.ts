import { IDataClient, ILogger } from ".";

/**
 * Core is an abstraction layer to ensure cross cutting global services are
 * not tied to any specific environment. This allows us to load different
 * cores for different environments and the rest of the code does not need
 * to care.
 */
export interface ICore {
  getLogger: (title: string) => ILogger;
  getDataClient: (domain: string) => IDataClient;
}

/**
 * Initialization configuration for the core. The core will be lazy loaded
 * according to the config.
 */
export interface ICoreConfig {
  environment: CoreEnvironment;
}

/** Types of cores supported. */
export enum CoreEnvironment {
  BrowserApp = "BrowserApp",
  Mock = "Mock"
}
