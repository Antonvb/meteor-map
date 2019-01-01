import {MapStateClass} from "../map-state/map-state.class";
import {select} from "d3-selection";

export class MapMetaClass {

    yearMeta;
    meteorMeta;

    constructor() {
        this.yearMeta = select('.year-meta');
        this.meteorMeta = select('.meteor-meta');
        this.setupListenerToMapStateUpdates();
    }

    setupListenerToMapStateUpdates() {
        MapStateClass.registerCb(this.reactToStateUpdate.bind(this));
    }

    reactToStateUpdate(newYear, meteorsForYear) {
        this.renderNewYear(newYear);
        this.renderNewMeteors(meteorsForYear);
    }

    renderNewYear(newYear) {
        this.yearMeta.html(`Showing meteors for year <span class="current-year">${newYear}</span>`);
    }

    renderNewMeteors(meteors) {
        this.meteorMeta.html('');
        for(let meteor of meteors) {
            this.renderMeteorInfo(meteor);
        }
    }

    renderMeteorInfo(meteor) {
        const div = this.meteorMeta.append('div').classed('single-meteor-meta', true);
        div.append('h4').text(`Meteor Id: ${meteor.id}`);
        div.append('p').text(`Meteor Location: ${meteor.name}`);
        div.append('p').text(`Meteor Weight: ${meteor.mass}kg`);
    }

}