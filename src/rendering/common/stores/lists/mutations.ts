import { IListData } from "@storeTypes";
import { IListState } from "./constants";

export const ListUsersUpdated = "listUsersUpdated";
export const ListTodoUpdated = "listTodoUpdated";

export default {
  [ListUsersUpdated]: (state: IListState, list: IListData[]): void => {
    state.usersList = list;
  },
  [ListTodoUpdated]: (state: IListState, list: IListData[]): void => {
    state.todosList = list;
  }
};
