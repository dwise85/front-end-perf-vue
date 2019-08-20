import { CoreEnvironment, generateCore } from "@providers";
import { mount, shallowMount, Wrapper } from "@vue/test-utils";
import merge from "lodash.merge";
import Vue, { VueConstructor } from "vue";

export class ComponentTest {
  public vm!: Wrapper<Vue>;

  public constructor(
    private component: VueConstructor<Vue>,
    private defaultOptions?: {
      mocks?: any;
      [key: string]: any;
    }
  ) {}

  public async createComponent(
    useShallow = true,
    createOptions?: any
  ): Promise<void> {
    let options = this.defaultOptions;
    const core = await generateCore({ environment: CoreEnvironment.Mock });
    options = {
      provide: {
        core
      },
      ...options
    };

    if (createOptions) {
      merge(options, createOptions);
    }
    this.vm = useShallow
      ? shallowMount(this.component, options)
      : mount(this.component, options);
  }

  public async execute(
    callback: (vm: Wrapper<Vue>) => Promise<void> | void
  ): Promise<void> {
    await this.vm.vm.$nextTick();
    await callback(this.vm);
  }
}
