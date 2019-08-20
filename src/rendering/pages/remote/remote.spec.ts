import { ComponentTest } from "@test-utils";
import { expect } from "chai";
import { RemotePage } from ".";

describe("Remote page", () => {
  let directiveTest: ComponentTest;

  beforeEach(async () => {
    directiveTest = new ComponentTest(RemotePage);
    await directiveTest.createComponent(false);
  });

  it("should render correct contents", async () => {
    await directiveTest.execute(vm => {
      expect(vm.element).not.undefined;
    });
  });
});
