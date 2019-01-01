import {SvgRendererClass} from "./svg-renderer.class";
import {MapDataClass} from "./map-classes/map-data.class";
import MapData from "../assets/data/map";
import {MapRenderer} from "./map-classes/map-renderer.class";
import {MeteorRendererClass} from "./meteor-classes/meteor-renderer.class";
import {MeteorDataLoader} from "./meteor-classes/meteor-data-loader.class";
import {MeteorsByYearClass} from "./meteor-classes/meteors-by-year.class";
import {TimeSelectorClass} from "./time-classes/time-selector.class";
import {MapStateClass} from "./map-state/map-state.class";

export class MeteorMapOrchestrationClass {

    svgRenderer;
    mapData;
    mapRenderer;
    meteorRenderer;
    timeSelectorClass;

    constructor() {
        this.setupRenderClasses();
    }

    setupRenderClasses() {
        this.svgRenderer = new SvgRendererClass();
        this.mapData =  new MapDataClass(MapData);
        this.mapRenderer  = new MapRenderer(this.svgRenderer, this.mapData);
        this.meteorRenderer = new MeteorRendererClass(this.svgRenderer, this.mapRenderer);
        this.timeSelectorClass = new TimeSelectorClass(this.svgRenderer);
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
        this.timeSelectorClass.render(years, meteorDataByYearClass.getMeteorArray());
        this.runMeteorsByYearVisualisation(years, meteorDataByYearClass)
    }

    runMeteorsByYearVisualisation(years, meteorDataByYearClass) {
        let yearIndex = 0;
        console.log(meteorDataByYearClass);
        const renderYearInterval = setInterval(() => {
            const yearToRender = years[yearIndex];

            if(!yearToRender) {
                console.log('No more years available');
                clearInterval(renderYearInterval);
                return;
            }

            MapStateClass.sendUpdate(yearToRender, meteorDataByYearClass.meteors[yearToRender]);

            this.timeSelectorClass.tick(yearToRender);
            this.renderMeteorsForYear(yearToRender, meteorDataByYearClass);
            yearIndex++;
        }, 2000);
    }

    renderMeteorsForYear(year, meteorByYearClass) {
        const data = meteorByYearClass.getMeteorsForYear(year);
        console.log('Rendering year ', year);
        this.meteorRenderer.render(data);
    }

}