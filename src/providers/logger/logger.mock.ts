import { ILogger } from "./logger.interface";
import { spy } from "sinon";

export class MockLogger implements ILogger {
  public info = spy();
  public warn = spy();
  public error = spy();
}
