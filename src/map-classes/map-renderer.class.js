import {geoMercator, geoPath} from "d3-geo";

export class MapRenderer {

    constructor(svgRenderer, mapData, width, height) {
        this.svgRenderer = svgRenderer;
        this.mapData = mapData;
        this.setMapProperties(width, height);
    }

    render() {
        this.svgRenderer.getSvg()
            .selectAll('.country')
            .data(this.mapData.getFeatureData())
            .enter()
            .append('path')
            .attr('class', 'country')
            .attr('d', this.path);

        this.svgRenderer.getSvg()
            .append('path')
            .datum(this.mapData.getMeshData())
            .attr('d', this.path)
            .attr('class', 'country-boundary');
    }

    getProjection() {
        return this.projection;
    }

    setMapProperties(width, height) {
        this.projection = geoMercator()
            .scale(300)
            .translate([width/2, height/2]);
        this.path = geoPath(this.projection);
    }

}