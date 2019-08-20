import { ICoreConfig, ICore, CoreEnvironment } from "./core.interface";

export const generateCore = async (config: ICoreConfig): Promise<ICore> => {
  switch (config.environment) {
    case CoreEnvironment.Mock: {
      const core = await import(
        /* webpackChunkName: "mockCore" */ "./core.mock"
      );
      return new core.MockCore();
    }
    default: {
      const core = await import(/* webpackChunkName: "webCore" */ "./core.web");
      return new core.WebCore();
    }
  }
};
