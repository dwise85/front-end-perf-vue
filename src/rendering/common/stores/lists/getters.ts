import { IListData } from "@storeTypes";
import { IListState } from "./constants";

export const ListUsersGetKey = "usersList";
export const ListTodosGetKey = "todosList";

export default {
  [ListUsersGetKey]: (state: IListState): IListData[] => state.usersList,
  [ListTodosGetKey]: (state: IListState): IListData[] => state.todosList
};
