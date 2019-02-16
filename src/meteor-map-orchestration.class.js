import { SvgRendererClass } from "./svg-renderer.class";
import { MapDataClass } from "./map-classes/map-data.class";
import MapData from "../assets/data/map";
import { MapRenderer } from "./map-classes/map-renderer.class";
import { MeteorRendererClass } from "./meteor-classes/meteor-renderer.class";
import { MeteorDataLoader } from "./meteor-classes/meteor-data-loader.class";
import { MeteorsByYearClass } from "./meteor-classes/meteors-by-year.class";
import { TimeSelectorClass } from "./time-classes/time-selector.class";
import { MapStateClass } from "./map-state/map-state.class";

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
    this.mapData = new MapDataClass(MapData);
    this.mapRenderer = new MapRenderer(this.svgRenderer, this.mapData);
    this.meteorRenderer = new MeteorRendererClass(
      this.svgRenderer,
      this.mapRenderer
    );
    this.timeSelectorClass = new TimeSelectorClass(this.svgRenderer);
  }

  async render() {
    this.svgRenderer.render();
    this.mapRenderer.render();

    this.setupRenderUpdateListener();

    return this.prepareAndRenderMapContext();
  }

  async prepareAndRenderMapContext() {
    const meteorData = await new MeteorDataLoader(50).getData();
    const meteorDataByYearClass = new MeteorsByYearClass(meteorData);
    const years = meteorDataByYearClass.getAvailableYears();
    this.timeSelectorClass.render(
      years,
      meteorDataByYearClass.getMeteorArray()
    );
    return meteorDataByYearClass;
  }

  setupRenderUpdateListener() {
    MapStateClass.registerCb(this.renderUpdatesForNewYear.bind(this));
  }

  renderUpdatesForNewYear(year, meteorData) {
    this.timeSelectorClass.tick(year);
    this.renderMeteors(meteorData);
  }

  renderMeteors(meteors) {
    this.meteorRenderer.render(meteors);
  }
}
