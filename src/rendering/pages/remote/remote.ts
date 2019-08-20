import { ListComponent } from "@components";
import { BCol, BContainer, BRow } from "bootstrap-vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    "b-container": BContainer,
    "b-col": BCol,
    "b-row": BRow,
    "users-list": ListComponent
  }
})
export default class RemotePage extends Vue {}
