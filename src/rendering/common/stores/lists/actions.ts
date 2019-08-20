import { ICore } from "@providers";
import { IStoreContext } from "@rtypes";
import { ListApi } from "./list-api";
import { ListTodoUpdated, ListUsersUpdated } from "./mutations";

export const ListUserUpdateKey = "listUsersUpdate";
export const ListTodoUpdateKey = "listTodosUpdate";

export const getActions = (core: ICore): any => {
  const api = new ListApi(core);

  return {
    [ListUserUpdateKey]: (context: IStoreContext) =>
      api
        .fetchUserItems()
        .then(list =>
          context.commit(
            ListUsersUpdated,
            list.map(item => ({ id: item.id, name: item.name }))
          )
        ),
    [ListTodoUpdateKey]: (context: IStoreContext) =>
      api
        .fetchTodoItems()
        .then(list =>
          context.commit(
            ListTodoUpdated,
            list.map(item => ({ id: item.id, name: item.title }))
          )
        )
  };
};
