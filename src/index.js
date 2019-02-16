import "../assets/styles/index.css";
import { MeteorMapOrchestrationClass } from "./meteor-map-orchestration.class";
import { transition } from "d3-transition";
import { MapMetaClass } from "./map-meta/map-meta.class";
import { MapControls } from "./map-controls/map-controls";

initMapAnimation();

async function initMapAnimation() {
  const orchestrationClass = new MeteorMapOrchestrationClass();
  const meteorMapData = await orchestrationClass.render();

  new MapMetaClass();
  new MapControls(meteorMapData);
}
