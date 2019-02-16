import { scalePoint, scaleLinear } from "d3-scale";
import { select, selectAll } from "d3-selection";
import { extent } from "d3-array";
import { line } from "d3-shape";

export class TimeSelectorClass {
  timeCanvas;
  timeSelectorHeight;

  constructor(svgRenderer) {
    this.svgRenderer = svgRenderer;
    this.timeScale = this.setupScale();
    this.timeSelectorHeight =
      svgRenderer.getTimeSelectorDimensions().height - 20;
  }

  render(years, meteorData) {
    this.timeScale.domain(years);
    this.drawInitialTimeSelector(years);

    this.drawYearSparkLine(meteorData);
  }

  tick(highlightedYear) {
    this.removeExistingHighlight();
    this.addHighlight(highlightedYear);
  }

  setupScale() {
    const { width } = this.svgRenderer.getTimeSelectorDimensions();
    return scalePoint()
      .range([0, width])
      .padding(0.1);
  }

  drawInitialTimeSelector(years) {
    const thisRef = this;
    this.timeCanvas = this.svgRenderer
      .getTimeSelectorSvg()
      .append("g")
      .classed("time-selector", true);

    const tickSelection = this.timeCanvas
      .selectAll(".time-selector-tick")
      .data(years);

    const enterSelection = tickSelection.enter();

    enterSelection
      .append("line")
      .attr("x1", year => this.timeScale(year))
      .attr("y1", year => (this.isHighlightedYear(year) ? 0 : 5))
      .attr("x2", year => this.timeScale(year))
      .attr("y2", () => this.timeSelectorHeight)
      .attr("stroke-width", 2)
      .attr("stroke", year => this.getTimeStrokeColour(year))
      .attr("class", year => `time-selector-tick time-selector-${year}`)
      .on("mouseover", function(d) {
        const currentLine = select(this);

        currentLine.attr("stroke", "white");

        thisRef.timeCanvas
          .append("text")
          .attr("x", select(this).attr("x1"))
          .attr("y", thisRef.timeSelectorHeight + 20)
          .attr("text-anchor", "middle")
          .classed("highlighted-text year-annotation", true)
          .text(d);
      })
      .on("mouseout", function() {
        select(this).attr("stroke", year => thisRef.getTimeStrokeColour(year));

        thisRef.timeCanvas.select(".highlighted-text").remove();
      });

    selectAll(".time-selector-tick").each(function(d) {
      if (!thisRef.isHighlightedYear(d)) {
        return;
      }

      const element = select(this);
      thisRef.timeCanvas
        .append("text")
        .attr("x", element.attr("x1"))
        .attr("y", thisRef.timeSelectorHeight + 20)
        .attr("text-anchor", "middle")
        .classed("year-annotation", true)
        .text(d);
    });
  }

  getTimeStrokeColour(year) {
    return this.isHighlightedYear(year)
      ? "rgba(242, 140, 129, 0.2)"
      : "rgba(242, 140, 129, 0.1)";
  }

  isHighlightedYear(year) {
    const firstYear = year === this.timeScale.domain()[0];
    const lastYear =
      year === this.timeScale.domain()[this.timeScale.domain().length - 1];
    const cleanModulo = year % 20 === 0;
    return firstYear || lastYear || cleanModulo;
  }

  removeExistingHighlight() {
    this.timeCanvas
      .select(".highlighted")
      .classed("highlighted", false)
      .attr("stroke", year =>
        this.isHighlightedYear(year)
          ? "rgba(242, 140, 129, 0.1)"
          : "rgba(242, 140, 129, 0.025)"
      );
  }

  addHighlight(year) {
    this.timeCanvas
      .select(`.time-selector-${year}`)
      .classed("highlighted", true)
      .attr("stroke", "rgba(242, 140, 129)");
  }

  drawYearSparkLine(meteorData) {
    const sparkLineScale = scaleLinear()
      .range([this.timeSelectorHeight, 0])
      .domain(extent(meteorData.map(({ count }) => count)));

    const sparkLine = line()
      .x(({ year }) => this.timeScale(year))
      .y(({ count }) => sparkLineScale(count));

    this.timeCanvas
      .append("path")
      .attr("d", sparkLine(meteorData))
      .attr("fill", "none")
      .attr("stroke", "rgb(242, 140, 129)");
  }
}
