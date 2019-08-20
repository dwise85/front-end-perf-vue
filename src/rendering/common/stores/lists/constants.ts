import { IListData } from "@storeTypes";

export interface IListState {
  usersList: IListData[];
  todosList: IListData[];
}

export const storeKey = "$lists";
export const generateExternalKey = (input: string): string =>
  `${storeKey}/${input}`;
