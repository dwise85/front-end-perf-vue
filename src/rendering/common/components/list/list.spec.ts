import { ComponentTest } from "@test-utils";
import { expect } from "chai";
import { ListComponent } from "../list";

describe("List component", () => {
  let directiveTest: ComponentTest;

  beforeEach(async () => {
    directiveTest = new ComponentTest(ListComponent);
    await directiveTest.createComponent(false);
  });

  it("should render correct contents", async () => {
    await directiveTest.execute(vm => {
      expect(vm.element).not.undefined;
    });
  });
});
