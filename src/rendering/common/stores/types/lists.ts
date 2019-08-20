import { IStoreKeys } from "@rtypes";

export interface IListData {
  id: number;
  name: string;
}

export interface IKeys extends IStoreKeys {
  listUsersUpdate: string;
  listUsersGet: string;
  listTodosUpdate: string;
  listTodosGet: string;
}
