import stacked_area from './stacked_area'
import issue_barChart from './issue_barChart'
import company_barChart from './company_barChart'
import state_barChart from './state_barChart'

const xValue = d => "issues";
const xLabel = 'Issue';
const yValue = "prod_count";
const yLabel = 'Complaint Count';
const colorValue = 'product';
const colorLabel = 'Products';
const margin = { left: 120, right: 300, top: 20, bottom: 120 };

const visualization = d3.select('#visualization');
const visualizationDiv = visualization.node();
const areaChart = visualization.select('svg');

const visualization2 = d3.select('#visualization2');
const visualizationDiv2 = visualization2.node();
const companyBars = visualization2.select('svg');

const visualization3 = d3.select('#visualization3');
const visualizationDiv3 = visualization3.node();
const issueBars = visualization3.select('svg');

const visualization4 = d3.select('#visualization4');
const visualizationDiv4 = visualization4.node();
const stateBars = visualization4.select('svg');


const parseDate = d3.timeFormat("%Y-%m");

const row = d => {
d.date = new Date(d.date);
d.product = d.product;
d.issues = d.issues;
d.prod_count = +d.prod_count;

return d;
};

d3.csv('data/cfpb_complaints4.csv', row, data => {

  var data1 = d3.nest()
      .key(function(d) {return parseDate(new Date(d.date));})
      .key(function(d) {return d.product;})
      .rollup(function(v) {return d3.sum(v,function(d) {return d.count;})})
      .entries(data)
      .map(function(group){
      return {
        date: group.key,
        product: group.values,
      }
    });

  var data2 = d3.nest()
    .key(function(d) {return d.issues;})
    .key(function(d){return d.product;})
    .rollup(function(v) {return  d3.sum(v,function(d) {return d.count;})})
    .entries(data)
    .map(function(group){
      return {
        issue: group.key,
        product: group.values,
      }
    });

  var data3 = d3.nest()
  .key(function(d) {return d.company;})
  .key(function(d){return d.product;})
  .rollup(function(v) {return  d3.sum(v,function(d) {return d.count;})})
  .entries(data)
  .map(function(group){
    return {
      company: group.key,
      product: group.values,
    }
  });

  var data4 = d3.nest()
  .key(function(d) {return d.state;})
  .key(function(d){return d.product;})
  .rollup(function(v) {return  d3.sum(v,function(d) {return d.count;})})
  .entries(data)
  .map(function(group){
    return {
      state: group.key,
      product: group.values,
    }
  });



  //console.log(data1)
  //console.log(data2)

  const render = () => {


    // Extract the width and height that was computed by CSS.
  areaChart
      .attr('width', visualizationDiv.clientWidth)
      .attr('height', visualizationDiv.clientHeight);

    // // Render the scatter plot.
    stacked_area(areaChart, {
      data1,
      xValue,
      xLabel,
      yValue,
      yLabel,
      colorValue,
      colorLabel,
      margin
    });

    issueBars
      .attr('width', visualizationDiv3.clientWidth)
      .attr('height', visualizationDiv3.clientHeight);

    issue_barChart(issueBars, {
      data2,
      xValue,
      xLabel,
      yValue,
      yLabel,
      colorValue,
      colorLabel,
      margin
    });

  

  companyBars
      .attr('width', visualizationDiv2.clientWidth)
      .attr('height', visualizationDiv2.clientHeight);
  company_barChart(companyBars, {
      data3,
      xValue,
      xLabel,
      yValue,
      yLabel,
      colorValue,
      colorLabel,
      margin
    });

  stateBars
      .attr('width', visualizationDiv4.clientWidth)
      .attr('height', visualizationDiv4.clientHeight);
  state_barChart(stateBars, {
      data4,
      xValue,
      xLabel,
      yValue,
      yLabel,
      colorValue,
      colorLabel,
      margin
    });
  };

  // Draw for the first time to initialize.
  render();

  // Redraw based on the new size whenever the browser window is resized.
  window.addEventListener('resize', render);

});
