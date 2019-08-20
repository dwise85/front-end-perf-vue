import { isDev } from "@rutils";
import { BCol, BContainer, BRow } from "bootstrap-vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    "b-container": BContainer,
    "b-col": BCol,
    "b-row": BRow
  }
})
export default class HomePage extends Vue {
  public mode = isDev ? "Development" : "Production";
}
