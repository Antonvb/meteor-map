import {scalePoint} from "d3-scale";

export class MeteorRendererClass {

    circleScale = scalePoint()
        .range([0, 20]);

    constructor(svgRenderer, mapRenderer) {
        this.svgRenderer = svgRenderer;
        this.projection = mapRenderer.getProjection();
    }

    render(meteorArray) {
        this.updateCircleScale(meteorArray);
        this.renderInnerCircle(meteorArray);
        this.renderOuterCircle(meteorArray);
    }

    updateCircleScale(data) {
        this.circleScale.domain(data.map( ({mass}) => mass ));
    }

    renderInnerCircle(data) {
        const innerCircle = this.svgRenderer.getSvg()
            .selectAll('.central-circle')
            .data(data);

        innerCircle
            .exit()
            .remove();

        innerCircle
            .enter()
            .append('circle')
            .attr('cx', ({reclong, reclat}) => this.projection([reclong, reclat])[0] )
            .attr('cy', ({reclong, reclat}) => this.projection([reclong, reclat])[1] )
            .attr('r', '4px')
            .attr('fill', 'white')
            .attr('class', 'central-circle');
    }

    renderOuterCircle(data) {
        const outerCircle = this.svgRenderer.getSvg()
            .selectAll('.outer-circle')
            .data(data);
        outerCircle
            .exit()
            .remove();

        outerCircle
            .enter()
            .append('circle')
            .attr('cx', ({reclong, reclat}) => this.projection([reclong, reclat])[0] )
            .attr('cy', ({reclong, reclat}) => this.projection([reclong, reclat])[1] )
            .attr('r', '0px')
            .attr('fill', 'white')
            .attr('fill-opacity', 0.3)
            .attr('class', 'outer-circle')
            .transition()
            .duration(200)
            .attr('r', ({mass}) => this.circleScale(mass) + 'px');
    }
}