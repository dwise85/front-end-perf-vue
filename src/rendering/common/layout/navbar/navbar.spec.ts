import { ComponentTest } from "@test-utils";
import { createLocalVue } from "@vue/test-utils";
import { expect } from "chai";
import VueRouter from "vue-router";
import { NavbarComponent } from ".";

describe("Navbar component", () => {
  let directiveTest: ComponentTest;
  let router: VueRouter;

  before(async () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    let homeComponent = { template: '<div class="home">Home</div>' };
    let aboutComponent = { template: '<div class="about">About</div>' };
    let listsComponent = { template: '<div class="lists">Lists</div>' };

    router = new VueRouter({
      routes: [
        { path: "/", component: homeComponent },
        { path: "/about", component: aboutComponent },
        { path: "/lists", component: listsComponent }
      ]
    });

    directiveTest = new ComponentTest(NavbarComponent, {
      localVue,
      router
    });
    await directiveTest.createComponent(false);
  });

  it("should render correct contents", async () => {
    await directiveTest.execute(vm => {
      // ensure Vue has bootstrapped/run change detection
      expect(vm.element.querySelectorAll(".navbar-nav a").length).to.equal(3);
    });
  });

  it("should render about tab on menu", async () => {
    await directiveTest.execute(vm => {
      let anchor = vm.element.querySelector(
        '.navbar-nav a[href="/about"]'
      ) as HTMLAnchorElement;
      expect(anchor).to.be.not.undefined;
    });
  });

  it("should render list tab on menu", async () => {
    await directiveTest.execute(vm => {
      let anchor = vm.element.querySelector(
        '.navbar-nav a[href="/list"]'
      ) as HTMLAnchorElement;
      expect(anchor).to.be.not.undefined;
    });
  });
});
