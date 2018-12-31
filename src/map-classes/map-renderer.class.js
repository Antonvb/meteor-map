import {geoMercator, geoPath} from "d3-geo";

export class MapRenderer {

    path;

    constructor(svgRenderer, mapData) {
        this.svgRenderer = svgRenderer;
        this.mapData = mapData;
        this.setMapProperties();
    }

    render() {
        this.svgRenderer.getMapSvg()
            .selectAll('.country')
            .data(this.mapData.getFeatureData())
            .enter()
            .append('path')
            .attr('class', 'country')
            .attr('d', this.path);

        this.svgRenderer.getMapSvg()
            .append('path')
            .datum(this.mapData.getMeshData())
            .attr('d', this.path)
            .attr('class', 'country-boundary');
    }

    getProjection() {
        return this.projection;
    }

    setMapProperties() {
        const { height } = this.svgRenderer.getMapDimensions();
        this.projection = geoMercator()
            .scale(1)
            .fitHeight(height, this.mapData.getMeshData());

        this.path = geoPath().projection(this.projection);
    }

}