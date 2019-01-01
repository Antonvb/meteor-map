import '../assets/styles/index.css';
import {MeteorMapOrchestrationClass} from "./meteor-map-orchestration.class";
import {transition} from "d3-transition";
import {MapControlState} from "./map-controls/map-control-state.class";
import {MapMetaClass} from "./map-meta/map-meta.class";

initMapAnimation();

async function initMapAnimation() {
    const orchestrationClass = new MeteorMapOrchestrationClass();
    const meteorMapData = await orchestrationClass.render();

    const mapMeta = new MapMetaClass();

    const mapControlState = new MapControlState(meteorMapData);
    document.querySelector('.next').addEventListener('click', () => {
        mapControlState.renderNextIndex();
    });
    document.querySelector('.prev').addEventListener('click', () => {
        mapControlState.renderPreviousIndex();
    });
    document.querySelector('.auto').addEventListener('click', () => {
        mapControlState.autoPlayFromIndex();
    });
    document.querySelector('.pause').addEventListener('click', () => {
        mapControlState.pauseAutoplay();
    });
}