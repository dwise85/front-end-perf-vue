import { ICore, ILogger } from "@providers";
import { IComponentStoreModule } from "@rtypes";
import { registerStoreLazy, StoreType, unRegisterStore } from "@rutils";
import { BContainer, BListGroup, BListGroupItem } from "bootstrap-vue";
import { Component, Inject, Prop, Vue } from "vue-property-decorator";

export enum ListType {
  Users = "user",
  Todos = "todos"
}

@Component({
  components: {
    "b-container": BContainer,
    "b-list": BListGroup,
    "b-list-item": BListGroupItem
  },
  data: () => ({
    items: []
  })
})
export default class ListComponent extends Vue {
  @Prop()
  public title?: string;
  @Prop()
  public listType?: ListType;
  @Inject()
  private core!: ICore;

  protected _logger!: ILogger;
  private _store!: IComponentStoreModule;

  public beforeDestroy(): void {
    unRegisterStore(this._store.storeKey, this.$store);
  }

  public created(): void {
    registerStoreLazy(StoreType.Lists, this.core, this.$store).then(store => {
      this._store = store;

      void this.$nextTick(() => {
        const [query, update] = this.storeKeys;

        return this.$store.dispatch(update).then(() => {
          this.$data.items = this.$store.getters[query];
        });
      });
    });
  }

  private get storeKeys(): string[] {
    if (this._store) {
      const accessKeys = this._store.accessKeys;
      switch (this.listType) {
        case ListType.Todos:
          return [accessKeys.listTodosGet, accessKeys.listTodosUpdate];
        default:
          return [accessKeys.listUsersGet, accessKeys.listUsersUpdate];
      }
    }
    return ["", ""];
  }
}
