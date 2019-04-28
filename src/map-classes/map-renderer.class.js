import { geoContains, geoMercator, geoPath } from "d3-geo";
import { MapStateClass } from "../map-state/map-state.class";
import scaleQuantize from "d3-scale/src/quantize";
import select from "d3-selection/src/select";
import { interpolateRdBu, schemeReds } from "d3-scale-chromatic";
import { selectAll } from "d3-selection";
import { max, range } from "d3-array";
import { values } from "d3-collection";
import { scaleLinear } from "d3-scale";

export class MapRenderer {
  path;

  weightByCountry = {};
  colourScale = scaleLinear()
    .domain([0, 50])
    .range([1, 0]);

  constructor(svgRenderer, mapData) {
    this.svgRenderer = svgRenderer;
    this.mapData = mapData;
    this.setMapProperties();

    MapStateClass.registerCb((year, meteors) =>
      this.reactToNewMeteors(meteors)
    );
  }

  render() {
    this.renderHeatMapLegend();
    this.svgRenderer
      .getMapSvg()
      .selectAll(".country")
      .data(this.mapData.getFeatureData())
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", this.path);

    this.svgRenderer
      .getMapSvg()
      .append("path")
      .datum(this.mapData.getMeshData())
      .attr("d", this.path)
      .attr("class", "country-boundary");
  }

  getProjection() {
    return this.projection;
  }

  setMapProperties() {
    const { height, width } = this.svgRenderer.getMapDimensions();
    this.projection = geoMercator()
      .scale(1)
      .fitHeight(height, this.mapData.getMeshData())
      .translate([width / 2, height / 2]);

    this.path = geoPath().projection(this.projection);
  }

  reactToNewMeteors(meteors) {
    meteors.forEach(meteor => this.getMeteorCountry(meteor));

    selectAll(".country").attr("fill", ({ properties: { abbrev } }) => {
      const countryMass = this.weightByCountry[abbrev]
        ? this.weightByCountry[abbrev]
        : 0;
      return interpolateRdBu(this.colourScale(countryMass));
    });
  }

  getMeteorCountry(meteor) {
    const country = this.mapData
      .getFeatureData()
      .find(country => geoContains(country, [meteor.reclong, meteor.reclat]));

    if (!country) {
      return;
    }

    const countryCode = country.properties.abbrev;

    if (!this.weightByCountry.hasOwnProperty(countryCode)) {
      this.weightByCountry[countryCode] = 0;
    }
    this.weightByCountry[countryCode]++;
  }

  renderHeatMapLegend() {
    const legendPointWidth = 20;
    const colourDomainRange = range(
      this.colourScale.domain()[0],
      this.colourScale.domain()[1],
      5
    );
    const legendWidth = legendPointWidth * colourDomainRange.length;
    console.log(colourDomainRange);
    const legend = this.svgRenderer
      .getMapSvg()
      .append("g")
      .classed("map-legend", true)
      .attr(
        "transform",
        `translate(${this.svgRenderer.getMapDimensions().width -
          legendWidth}, 0)`
      );

    legend
      .append("text")
      .attr("fill", "white")
      .text("Overall Meteors by Country");

    legend
      .selectAll(".legend-point")
      .data(colourDomainRange)
      .enter()
      .append("rect")
      .attr("width", legendPointWidth)
      .attr("height", legendPointWidth)
      .attr("x", (legend, index) => index * legendPointWidth)
      .attr("y", 8)
      .attr("fill", legend => interpolateRdBu(this.colourScale(legend)))
      .attr("stroke-width", 1)
      .attr("stroke", "white");

    legend
      .append("text")
      .attr("y", legendPointWidth + 25)
      .attr("fill", "white")
      .text(this.colourScale.domain()[0]);

    legend
      .append("text")
      .attr("x", legendWidth)
      .attr("text-anchor", "end")
      .attr("y", legendPointWidth + 25)

      .attr("fill", "white")
      .text(`${this.colourScale.domain()[1]}+`);
  }
}
