import { MapControlState } from "./map-control-state.class";

export class MapControls {
  controlState;

  constructor(mapData) {
    this.controlState = new MapControlState(mapData);
    this.setupButtonListeners();
  }

  setupButtonListeners() {
    const selectedButtonClass = "selected";

    document.querySelector(".next").addEventListener("click", () => {
      this.controlState.renderNextIndex();
    });
    document.querySelector(".prev").addEventListener("click", () => {
      this.controlState.renderPreviousIndex();
    });

    const autoplayButton = document.querySelector(".auto");
    autoplayButton.addEventListener("click", () => {
      autoplayButton.classList.add(selectedButtonClass);
      this.controlState.autoPlayFromIndex();
    });

    document.querySelector(".pause").addEventListener("click", () => {
      autoplayButton.classList.remove(selectedButtonClass);
      this.controlState.pauseAutoplay();
    });
  }
}
