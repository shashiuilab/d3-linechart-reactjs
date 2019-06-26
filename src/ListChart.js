import React, { Component } from "react";
import * as d3 from "d3";
class ListChart extends Component {
  componentDidMount() {
    const { dataset, margin } = this.props;
    const width = 800,
      height = window.innerHeight - margin.top - margin.bottom,
      padding = 100;

    var xScale = d3
      .scaleLinear()
      .domain([
        d3.min(dataset, d => d.category),
        d3.max(dataset, d => d.category)
      ])
      .range([0, width]);

    var yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    var line = d3
      .line()
      .x(function(d, i) {
        return xScale(d.category);
      })
      .y(function(d) {
        return yScale(d.value);
      });

    function drawYGridLines() {
      return d3.axisLeft(yScale);
    }

    var svg = d3
      .select(".line-diagram")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale).ticks(dataset.length));

    svg
      .append("g")
      .attr("class", "y axis")
      .call(
        d3.axisLeft(yScale).tickFormat(function(d) {
          return d + "%";
        })
      )
      .append("text");

    svg
      .append("path")
      .datum(dataset)
      .attr("class", "line")
      .attr("d", line);

    var toolTipDiv = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg
      .selectAll(".dot")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", function(d, i) {
        return xScale(d.category);
      })
      .attr("cy", function(d) {
        return yScale(d.value);
      })
      .attr("r", 5)
      .on("mouseover", function(d) {
        const arr = [];
        dataset.map(dataSet => {
          if (dataSet.category === d.category) {
            arr.push(dataSet.user);
          }
          return arr.join(",");
        });
        toolTipDiv
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        toolTipDiv
          .text(arr)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function(d) {
        toolTipDiv
          .transition()
          .duration(500)
          .style("opacity", 0);
      });
    svg
      .append("text")
      .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate(-35," + height / 2 + ")rotate(-90)") // text is drawn off the screen top left, move down and out and rotate
      .text("Value");
    svg
      .append("text")
      .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate(" + width / 2 + "," + (height + 20) + ")") // centre below axis
      .text("Category");
    svg
      .append("g")
      .attr("class", "grid")
      .call(
        drawYGridLines()
          .tickSize(-width)
          .tickFormat("")
      );
  }
  render() {
    return <div class="line-diagram" />;
  }
}
export default ListChart;
