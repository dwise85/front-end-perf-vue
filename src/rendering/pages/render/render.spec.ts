import { ComponentTest } from "@test-utils";
import { assert } from "sinon";
import { RenderPage } from ".";

describe("Render page", () => {
  let directiveTest: ComponentTest;

  beforeEach(async () => {
    directiveTest = new ComponentTest(RenderPage);
    await directiveTest.createComponent();
  });

  it("should render correct contents", async () => {
    await directiveTest.execute(vm => {
      assert.calledWith(vm.vm["logger"].info, "render test is ready!");
    });
  });
});
