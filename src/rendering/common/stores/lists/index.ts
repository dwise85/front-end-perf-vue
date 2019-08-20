import { ICore } from "@providers";
import { IStoreModule, IStoreModuleCreator } from "@rtypes";
import { IKeys, IListData } from "@storeTypes";
import { getActions, ListTodoUpdateKey, ListUserUpdateKey } from "./actions";
import { generateExternalKey, IListState, storeKey } from "./constants";
import getters, { ListTodosGetKey, ListUsersGetKey } from "./getters";
import mutations from "./mutations";

let usersList: IListData[] = [];
let todosList: IListData[] = [];
const state: IListState = {
  usersList,
  todosList
};

const generateStore = (core: ICore): IStoreModule => ({
  namespaced: true,
  state,
  getters,
  mutations,
  actions: getActions(core)
});

const accessKeys: IKeys = {
  listUsersUpdate: generateExternalKey(ListUserUpdateKey),
  listUsersGet: generateExternalKey(ListUsersGetKey),
  listTodosUpdate: generateExternalKey(ListTodoUpdateKey),
  listTodosGet: generateExternalKey(ListTodosGetKey)
};

export const store: IStoreModuleCreator<IKeys> = {
  generateStore,
  storeKey,
  accessKeys
};
