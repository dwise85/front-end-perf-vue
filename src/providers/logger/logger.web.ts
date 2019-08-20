import { ILogger } from "./logger.interface";

/* eslint-disable no-console */
export class WebLogger implements ILogger {
  public constructor(private _title: string) {}

  public info(msg: string): void {
    console.info(`${this._title}: ${msg}`);
  }

  public warn(msg: string): void {
    console.warn(`${this._title}: ${msg}`);
  }

  public error(msg: string): void {
    console.error(`${this._title}: ${msg}`);
  }
}
