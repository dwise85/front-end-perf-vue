import { ICore, ILogger, IDataClient } from ".";
import { MockDataClient } from "./data-client/data-client.mock";
import { MockLogger } from "./logger/logger.mock";

export class MockCore implements ICore {
  public getLogger(): ILogger {
    return new MockLogger();
  }

  public getDataClient(): IDataClient {
    return new MockDataClient();
  }
}
