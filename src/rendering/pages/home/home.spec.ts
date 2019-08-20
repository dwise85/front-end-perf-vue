import { isDev } from "@rutils";
import { ComponentTest } from "@test-utils";
import { expect } from "chai";
import { HomePage } from "../home";

describe("Home page", () => {
  let directiveTest: ComponentTest;

  beforeEach(async () => {
    directiveTest = new ComponentTest(HomePage);
    await directiveTest.createComponent();
  });

  it("should render correct contents", async () => {
    await directiveTest.execute(vm => {
      expect(vm.element.querySelector(".mode").textContent).to.equal(
        isDev ? "Development mode" : "Production mode"
      );
    });
  });
});
