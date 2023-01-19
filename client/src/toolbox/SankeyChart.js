import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { sankey as Sankey } from "d3-sankey";


const SankeyChart = ({ post }) => {
    const d3Container = useRef(null);
    var margin = { top: 10, right: 10, bottom: 10, left: 10 }
    var width = 450 - margin.left - margin.right
    var height = 480 - margin.top - margin.bottom

    useEffect(() => {
        if (d3Container.current) {
            var svg = d3.select(d3Container.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            var color = d3.scaleOrdinal(d3.schemeCategory10);

            var sankey = Sankey()
                .nodeWidth(36)
                .nodePadding(290)
                .size([width, height]);

            var path = sankey.links();

            d3.json({
                "nodes": [
                { "node": 0, "name": "node0" },
                { "node": 1, "name": "node1" },
                { "node": 2, "name": "node2" },
                { "node": 3, "name": "node3" },
                { "node": 4, "name": "node4" }
            ],
            "links": [
                { "source": 0, "target": 2, "value": 2 },
                { "source": 1, "target": 2, "value": 2 },
                { "source": 1, "target": 3, "value": 2 },
                { "source": 0, "target": 4, "value": 2 },
                { "source": 2, "target": 3, "value": 2 },
                { "source": 2, "target": 4, "value": 2 },
                { "source": 3, "target": 4, "value": 4 }
            ]
            }, function (error, graph) {

                sankey
                    .nodes(graph.nodes)
                    .links(graph.links)
                    .layout(32);

                var link = svg.append("g")
                    .selectAll(".link")
                    .data(graph.links)
                    .enter()
                    .append("path")
                    .attr("class", "link")
                    .attr("d", sankey.links())
                    .style("stroke-width", function (d) { return Math.max(1, d.dy); })
                    .sort(function (a, b) { return b.dy - a.dy; });

                var node = svg.append("g")
                    .selectAll(".node")
                    .data(graph.nodes)
                    .enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
                    .call(d3.drag()
                        .subject(function (d) { return d; })
                        .on("start", function () { this.parentNode.appendChild(this); })
                        .on("drag", dragmove));

                node
                    .append("rect")
                    .attr("height", function (d) { return d.dy; })
                    .attr("width", sankey.nodeWidth())
                    .style("fill", function (d) { return d.color = color(d.name.replace(/ .*/, "")); })
                    .style("stroke", function (d) { return d3.rgb(d.color).darker(2); })
                    // Add hover text
                    .append("title")
                    .text(function (d) { return d.name + "\n" + "There is " + d.value + " stuff in this node"; });

                node
                    .append("text")
                    .attr("x", -6)
                    .attr("y", function (d) { return d.dy / 2; })
                    .attr("dy", ".35em")
                    .attr("text-anchor", "end")
                    .attr("transform", null)
                    .text(function (d) { return d.name; })
                    .filter(function (d) { return d.x < width / 2; })
                    .attr("x", 6 + sankey.nodeWidth())
                    .attr("text-anchor", "start");

                function dragmove(event, d) {
                    d3.select(this)
                        .attr("transform",
                            "translate("
                            + d.x + ","
                            + (d.y = Math.max(
                                0, Math.min(height - d.dy, event.y))
                            ) + ")");
                    sankey.relayout();
                    link.attr("d", path);
                }
            })
        }
    }, [post, d3Container.current])
    console.log("sada")


    return (
        <svg ref={d3Container} />
    )
}

export default SankeyChart

/*const graph = {
    "nodes": [
        { "node": 0, "name": "node0" },
        { "node": 1, "name": "node1" },
        { "node": 2, "name": "node2" },
        { "node": 3, "name": "node3" },
        { "node": 4, "name": "node4" }
    ],
    "links": [
        { "source": 0, "target": 2, "value": 2 },
        { "source": 1, "target": 2, "value": 2 },
        { "source": 1, "target": 3, "value": 2 },
        { "source": 0, "target": 4, "value": 2 },
        { "source": 2, "target": 3, "value": 2 },
        { "source": 2, "target": 4, "value": 2 },
        { "source": 3, "target": 4, "value": 4 }
    ]
}*/