import '../assets/styles/index.css';
import {transition} from 'd3-transition';
import {MeteorMapOrchestrationClass} from "./meteor-map-orchestration.class";

const orchestrationClass = new MeteorMapOrchestrationClass(window.innerWidth, window.innerHeight);
orchestrationClass.render();