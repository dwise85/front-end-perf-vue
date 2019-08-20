import { ICore, ILogger } from "@providers";
import { BCol, BContainer, BRow } from "bootstrap-vue";
import { Component, Inject, Vue } from "vue-property-decorator";

interface ISquare {
  isFlashed: boolean;
}

@Component({
  components: {
    "b-container": BContainer,
    "b-col": BCol,
    "b-row": BRow
  }
})
export default class RenderPage extends Vue {
  protected logger!: ILogger;
  @Inject()
  public readonly core!: ICore;
  public squares: ISquare[][] = [];
  private intervalId!: number;

  public created(): void {
    if (!this.logger) {
      this.logger = this.core.getLogger("RenderPage");
    }
    this.$nextTick(() => this.logger.info("render test is ready!"));

    const intervalTimerMs = 500;
    const sizeOfSquares = 20;
    this.squares = this.createSquares(sizeOfSquares);
    this.intervalId = window.setInterval(
      () =>
        this.$nextTick(() => (this.squares = this.updateSquares(this.squares))),
      intervalTimerMs
    );
  }

  public beforeDestroy(): void {
    this.logger.info("Render test is tearing down!");
    clearInterval(this.intervalId);
  }

  /**
   * Go through all of our squares and change their flash state. It is important we don't mutate
   * the original array, but clone it and then set it.
   */
  private updateSquares(originSquares: ISquare[][]): ISquare[][] {
    const defaultSquares = originSquares.slice(0);
    defaultSquares.forEach(subSquares =>
      subSquares.forEach(square => (square.isFlashed = !square.isFlashed))
    );
    return defaultSquares;
  }

  /** Make a bunch of squares to render to the screen. */
  private createSquares(size: number): ISquare[][] {
    const defaultSquares: ISquare[][] = new Array(size);
    for (let i = 0; i < defaultSquares.length; i++) {
      defaultSquares[i] = [];
      for (let k = 0; k < defaultSquares.length; k++) {
        defaultSquares[i].push({
          isFlashed: Math.floor(Math.random() * 100) % 2 === 0
        });
      }
    }
    return defaultSquares;
  }
}
