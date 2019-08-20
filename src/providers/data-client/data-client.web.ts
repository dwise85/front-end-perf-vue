import { IDataClient } from "./data-client.interface";

export class WebDataClient implements IDataClient {
  public constructor(private apiDomain: string) {}

  public get<T>(api: string): Promise<T> {
    return fetch(`${this.apiDomain}/${api}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  }
}
