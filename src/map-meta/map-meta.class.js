import {MapStateClass} from "../map-state/map-state.class";
import {select} from "d3-selection";

export class MapMetaClass {
    yearMeta;
    meteorMeta;
    meteorCount;

    constructor() {
        this.yearMeta = select('.year-meta');
        this.meteorMeta = select('.meteor-meta');
        this.meteorCount = select('.meteor-count');
        this.setupListenerToMapStateUpdates();
    }

    setupListenerToMapStateUpdates() {
        MapStateClass.registerCb(this.reactToStateUpdate.bind(this));
    }

    reactToStateUpdate(newYear, meteorsForYear) {
        this.renderNewYear(newYear);
        this.renderMeteorCount(meteorsForYear.length);
        this.renderNewMeteors(meteorsForYear);
    }

    renderNewYear(newYear) {
        this.yearMeta.html(`Showing meteors for year: <span class="current-year">${newYear}</span>`);
    }

    renderNewMeteors(meteors) {
        this.meteorMeta.html('');
        for(let meteor of meteors) {
            this.renderMeteorInfo(meteor);
        }
    }

    renderMeteorCount(count) {
        this.meteorCount.html(`Number of Meteors: <span class="meteor-count-number">${count}</span>`);
    }

    renderMeteorInfo(meteor) {
        const div = this.meteorMeta.append('div').classed('single-meteor-meta', true);
        div.append('h4').text(`Meteor Id: ${meteor.id}`);
        div.append('p').text(`Meteor Location: ${meteor.name}`);
        div.append('p').text(`Meteor Weight: ${meteor.mass}kg`);
    }

}