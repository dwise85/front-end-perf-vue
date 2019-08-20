import { IDataClient } from "./data-client.interface";
import { stub } from "sinon";

export class MockDataClient implements IDataClient {
  public get = stub().returns(Promise.resolve());
}
