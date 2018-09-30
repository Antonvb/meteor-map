import {SvgRendererClass} from "./svg-renderer.class";
import {MapDataClass} from "./map-classes/map-data.class";
import MapData from "../assets/data/map";
import {MapRenderer} from "./map-classes/map-renderer.class";
import {MeteorRendererClass} from "./meteor-classes/meteor-renderer.class";
import {MeteorDataLoader} from "./meteor-classes/meteor-data-loader.class";
import {MeteorsByYearClass} from "./meteor-classes/meteors-by-year.class";

export class MeteorMapOrchestrationClass {

    svgRenderer;
    mapData;
    mapRenderer;
    meteorRenderer;

    constructor(width, height) {
        this.setupRenderClasses(width, height);
    }

    setupRenderClasses(width, height) {
        this.svgRenderer = new SvgRendererClass(width, height);
        this.mapData =  new MapDataClass(MapData);
        this.mapRenderer  = new MapRenderer(this.svgRenderer, this.mapData, width, height);
        this.meteorRenderer = new MeteorRendererClass(this.svgRenderer, this.mapRenderer);
    }

    render() {
        this.svgRenderer.render();
        this.mapRenderer.render();

        this.renderMeteors();
    }

    async renderMeteors() {
        const meteorData = await new MeteorDataLoader(50).getData();
        const meteorDataByYearClass = new MeteorsByYearClass(meteorData);
        const years = meteorDataByYearClass.getAvailableYears();
        this.runMeteorsByYearVisualisation(years, meteorDataByYearClass)
    }

    runMeteorsByYearVisualisation(years, meteorDataByYearClass) {
        let yearIndex = 0;
        const renderYearInterval = setInterval(() => {
            const yearToRender = years[yearIndex];

            if(!yearToRender) {
                console.log('No more years available');
                clearInterval(renderYearInterval);
            }

            this.renderMeteorsForYear(yearToRender, meteorDataByYearClass);
            yearIndex++;
        }, 1000);
    }

    renderMeteorsForYear(year, meteorByYearClass) {
        const data = meteorByYearClass.getMeteorsForYear(year);
        console.log('Rendering year ', year);
        this.meteorRenderer.render(data);
    }

}