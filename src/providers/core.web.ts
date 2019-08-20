import { ILogger, ICore, IDataClient } from ".";
import { WebLogger } from "./logger/logger.web";
import { WebDataClient } from "./data-client/data-client.web";

export class WebCore implements ICore {
  public constructor() {}

  public getLogger(title: string): ILogger {
    return new WebLogger(title);
  }

  public getDataClient(domain: string): IDataClient {
    return new WebDataClient(domain);
  }
}
