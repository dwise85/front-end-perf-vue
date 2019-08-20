import { ICore, ILogger } from "@providers";
import {
  BCollapse,
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BNavbarToggle,
  BNavItem
} from "bootstrap-vue";
import { Component, Inject, Vue, Watch } from "vue-property-decorator";
import { Link } from "./link";

@Component({
  name: "NavbarComponent",
  components: {
    "b-collapse": BCollapse,
    "b-nav-item": BNavItem,
    "b-navbar": BNavbar,
    "b-navbar-toggle": BNavbarToggle,
    "b-navbar-brand": BNavbarBrand,
    "b-navbar-nav": BNavbarNav
  }
})
export default class NavbarComponent extends Vue {
  public brand = "VuePerfX";
  public links: Link[] = [
    new Link("Home", "/"),
    new Link("Render", "/render"),
    new Link("Remote", "/remote")
  ];

  protected _logger!: ILogger;
  @Inject()
  private core!: ICore;

  @Watch("$route.path")
  public pathChanged(): void {
    this._logger.info("Changed current path to: " + this.$route.path);
  }

  public mounted(): void {
    if (!this._logger) {
      this._logger = this.core.getLogger("NavbarComponent");
    }
  }
}
