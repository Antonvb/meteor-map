import '../assets/styles/index.css';
import {MeteorMapOrchestrationClass} from "./meteor-map-orchestration.class";
import {transition} from "d3-transition";
import {MapMetaClass} from "./map-meta/map-meta.class";

const orchestrationClass = new MeteorMapOrchestrationClass();
orchestrationClass.render();
const mapMeta = new MapMetaClass();