import {MapStateClass} from "../map-state/map-state.class";

export class MapControlState {

    yearIndex = 0;
    yearAutoplayInterval;
    meteorData;

    constructor(meteorData) {
        this.meteorData = meteorData;
        this.setStateToIndex(this.yearIndex);
    }

    autoPlayFromIndex() {
        this.renderNextIndex();
        this.yearAutoplayInterval = setInterval(() => {
            console.log(this.yearIndex, this.meteorData.getAvailableYears().length);
            if(this.meteorData.getAvailableYears().length < this.yearIndex) {
                console.log('No more years available');
                this.pauseAutoplay();
                return;
            }

            this.renderNextIndex();
        }, 2000);
    }

    renderNextIndex() {
        const newIndex = this.yearIndex + 1;
        this.setStateToIndex(newIndex);
    }

    renderPreviousIndex() {
        const newIndex = this.yearIndex - 1;
        this.setStateToIndex(newIndex);
    }

    pauseAutoplay() {
        clearInterval(this.yearAutoplayInterval);
    }

    setStateToIndex(index) {
        this.yearIndex = index;
        const yearToRender = this.meteorData.getAvailableYears()[this.yearIndex];
        console.log('Year to render next, ', yearToRender);
        console.log(this.meteorData.getMeteorsForYear(yearToRender));
        MapStateClass.sendUpdate(yearToRender, this.meteorData.getMeteorsForYear(yearToRender));
    }
}