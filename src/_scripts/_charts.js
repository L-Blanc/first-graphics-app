// Main javascript entry point
// Should handle bootstrapping/starting application
import * as d3 from "d3";
import annualTotals from "../_data/annual_totals";

var createChart = (el, fieldname) => {
var margin = {top: 20, right:20, bottom:20, left:40};
// Make sure you use the # here!
  var container = d3.select(el);
var containerWidth = container.node().offsetWidth;
var containerHeight = containerWidth * 0.66;
var chartWidth = containerWidth - margin.right - margin.left;
var chartHeight = containerHeight - margin.top - margin.bottom;


            var svg = container.append('svg')
                    .attr('width', chartWidth)
                    .attr('height', chartHeight)
                    .append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)
            // At the end of the _charts.js file
console.log('hello, this is my charts file!');
var xDomain = annualTotals.map(d => d.year);
var yDomain = [0, d3.max(annualTotals.map(d => d[fieldname]))];

var xScale = d3.scaleBand()
  .domain(xDomain)
  .range([0, chartWidth])
  .padding(0.1);

var yScale = d3.scaleLinear()
  .domain(yDomain)
  .range([chartHeight, 0]);
var xAxis = d3.axisBottom(xScale)
  .tickValues([2000, 2005, 2010, 2015, 2017]);
var yAxis = d3.axisLeft(yScale)
  .tickSize(-chartWidth)
  .ticks(4);


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);


    svg.append('g')
        .attr('class', 'bars')
        .selectAll('.bar')
        .data(annualTotals)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.year))
          .attr('y', d => yScale(d[fieldname]))
        .attr('width', xScale.bandwidth())
        .attr('height', d => chartHeight - yScale(d[fieldname]));
}
createChart("#county-homicides", "homicides_total")
createChart("#harvard-park-homicides", "homicides_harvard_park")
