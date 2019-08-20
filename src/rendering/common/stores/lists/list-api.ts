import { ICore, IDataClient, ILogger } from "@providers";

export interface IUserModel {
  id: number;
  name: string;
  userName: string;
  email: string;
  phone: string;
  website: string;
  address: {
    name: string;
  };
  company: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}
export interface IListModel {
  id: number;
  userId: number;
  title: string;
  complete: boolean;
}

/**
 * Information on list APIs available here:
 * https://jsonplaceholder.typicode.com/
 */

export class ListApi {
  private dataClient: IDataClient;
  private logger: ILogger;

  public constructor(core: ICore) {
    const domain = "https://jsonplaceholder.typicode.com";
    this.dataClient = core.getDataClient(domain);
    this.logger = core.getLogger("ListApi");
  }

  public fetchUserItems(): Promise<IUserModel[]> {
    const api = "users";
    return this.dataClient.get<IUserModel[]>(api).catch(error => {
      this.logger.error(`fetchUserItems:${error}`);
      return [];
    });
  }

  public fetchTodoItems(): Promise<IListModel[]> {
    const api = "todos";
    return this.dataClient.get<IListModel[]>(api).catch(error => {
      this.logger.error(`fetchTodoItems:${error}`);
      return [];
    });
  }
}
