import { select } from "d3-selection";

export class SvgRendererClass {
  static containerPadding = 20;

  static mapHeight;
  static timeHeight;
  static timePaddingTop;

  svgCanvas;
  svg;
  renderContainer;

  mapGroup;
  timeGroup;

  constructor() {
    this.svgCanvas = select(".render-canvas");
    this.width = this.svgCanvas.node().getBoundingClientRect().width;
    const containerInnerHeight =
      this.svgCanvas.node().getBoundingClientRect().height -
      2 * SvgRendererClass.containerPadding;

    SvgRendererClass.mapHeight = containerInnerHeight * 0.8;
    SvgRendererClass.timePaddingTop = containerInnerHeight * 0.05;
    SvgRendererClass.timeHeight = containerInnerHeight * 0.15;
  }

  render() {
    this.svg = this.svgCanvas
      .append("svg")
      .attr("height", SvgRendererClass.getSvgHeight())
      .attr("width", "100%");

    this.renderContainer = this.svg
      .append("g")
      .attr(
        "transform",
        `translate(${SvgRendererClass.containerPadding}, ${
          SvgRendererClass.containerPadding
        })`
      );

    this.mapGroup = this.renderContainer.append("g").classed("map-group", true);

    this.timeGroup = this.renderContainer
      .append("g")
      .attr(
        "transform",
        `translate(0, ${SvgRendererClass.mapHeight +
          SvgRendererClass.timePaddingTop})`
      )
      .classed("time-group", true);
  }

  getMapSvg() {
    return this.mapGroup;
  }

  getTimeSelectorSvg() {
    return this.timeGroup;
  }

  getMapDimensions() {
    return {
      height: SvgRendererClass.mapHeight,
      width: this.width - 2 * SvgRendererClass.containerPadding
    };
  }

  getTimeSelectorDimensions() {
    return {
      height: SvgRendererClass.timeHeight,
      width: this.width - 2 * SvgRendererClass.containerPadding
    };
  }

  static getSvgHeight() {
    const overallHeightPadding = SvgRendererClass.containerPadding * 2;
    return (
      SvgRendererClass.mapHeight +
      SvgRendererClass.timeHeight +
      overallHeightPadding +
      SvgRendererClass.timePaddingTop
    );
  }
}
