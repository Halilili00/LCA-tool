import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const PieChart = ({ post }) => {
    const d3Container = useRef(null);
    const pieDimensions = {
        width: 450,
        height: 450,
        margins: 40,
    }
    const data = {annualProduction: post.annualProduction.value, energyConsumption: post.energyConsumption.value}
    const radius = Math.min(pieDimensions.width, pieDimensions.height / 2 - pieDimensions.margins)
    useEffect(
        () => {
            if (data && d3Container.current) {
                const svg = d3.select(d3Container.current)
                    .append("g")
                    .attr("transform", "translate(" + pieDimensions.width / 2 + "," + pieDimensions.height / 2 + ")");

                const color = d3.scaleOrdinal()
                    .range(d3.schemeSet2);

                const pie = d3.pie()
                    .value(function (d) { return d[1] })
                const data_ready = pie(Object.entries(data))

                const arcGenerator = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius)

                svg
                    .selectAll('mySlices')
                    .data(data_ready)
                    .join('path')
                    .attr('d', arcGenerator)
                    .attr('fill', function (d) { return (color(d.data[0])) })
                    .attr("stroke", "black")
                    .style("stroke-width", "2px")
                    .style("opacity", 0.7)

                // Now add the annotation. Use the centroid method to get the best coordinates
                svg
                    .selectAll('mySlices')
                    .data(data_ready)
                    .join('text')
                    .text(function (d) { return ""+ d.data[1]})
                    .attr("transform", function (d) { return `translate(${arcGenerator.centroid(d)})` })
                    .style("text-anchor", "middle")
                    .style("font-size", 17)
            }
        },
        [post, d3Container.current])

    console.log(post)
    return (
        <svg
            className="d3-component"
            width={450}
            height={450}
            ref={d3Container}
        />
    )
}

export default PieChart