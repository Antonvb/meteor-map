import {select} from "d3-selection";

export class SvgRendererClass {

    svg;

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    render() {
        this.svg = select('body')
            .append('svg')
            .attr('height', this.height)
            .attr('width', this.width);
    }

    getSvg() {
        return this.svg;
    }

}