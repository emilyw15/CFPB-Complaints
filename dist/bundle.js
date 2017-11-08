/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stacked_area__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__issue_barChart__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__company_barChart__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state_barChart__ = __webpack_require__(4);





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
    Object(__WEBPACK_IMPORTED_MODULE_0__stacked_area__["a" /* default */])(areaChart, {
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

    Object(__WEBPACK_IMPORTED_MODULE_1__issue_barChart__["a" /* default */])(issueBars, {
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
  Object(__WEBPACK_IMPORTED_MODULE_2__company_barChart__["a" /* default */])(companyBars, {
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
  Object(__WEBPACK_IMPORTED_MODULE_3__state_barChart__["a" /* default */])(stateBars, {
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const xScale = d3.scaleTime();
const yScale = d3.scaleLinear();
const colorScale = d3.scaleOrdinal(d3.schemeCategory20);

const xAxis = d3.axisBottom()
.scale(xScale)
.tickPadding(15);

const yAxis = d3.axisLeft()
.scale(yScale)
.tickPadding(15);

const colorLegend = d3.legendColor()
.scale(colorScale)
.shapePadding(3)
.shapeWidth(15)
.shapeHeight(15)
.labelOffset(4);

const xAxisLabelOffset = 48;
const yAxisLabelOffset = 60;

/* harmony default export */ __webpack_exports__["a"] = (function (svg, props) {
  const { 
    data1,
    xValue,
    xLabel,
    yValue,
    yLabel,
    colorValue,
    colorLabel,
    margin
  } = props;

  svg.selectAll("*").remove();
  const areaColumn = colorValue;

  var parseTime = d3.timeParse("%Y-%m");

  data1.forEach(function(d) {
    if (typeof(d.date)!='object'){
      d.date = parseTime(d.date);
    }
  });

  const width = svg.attr('width');
  const height = svg.attr('height');
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  let g = svg.selectAll('.container').data([null]);
  const gEnter = g.enter().append('g').attr('class','container');
  g = gEnter
    .merge(g)
      .attr("transform", `translate(${margin.left},${margin.top})`);


  // var g = svg.append("g")
  // .attr("transform", `translate(${margin.left},${margin.top})`);

  const xAxisGEnter = gEnter.append('g').attr('class','x-axis');
  const xAxisG = xAxisGEnter
    .merge(g.select('.x-axis'))
      .attr("transform", `translate(0, ${innerHeight})`);

  const yAxisGEnter = gEnter.append('g').attr('class','y-axis');
  const yAxisG = yAxisGEnter.merge(g.select('.y-axis'));


  const colorLegendGEnter = gEnter.append('g').attr('class', 'legend');
  const colorLegendG = colorLegendGEnter
    .merge(g.select('.legend'))
      .attr('transform', `translate(${innerWidth + 60}, 50)`);

  var marksG = g.append('g');

  xAxisGEnter
  .append('text')
    .attr('class', 'axis-label')
    .attr('y', 55)
  .merge(xAxisG.select('.axis-label'))
    .attr('x', innerWidth / 2)
    .text("Date");

  yAxisGEnter
    .append('text')
      .attr('class', 'axis-label')
      .attr('y', -60)
      .style('text-anchor', 'middle')
    .merge(yAxisG.select('.axis-label'))
      .attr('x', -innerHeight / 2)
      .attr('transform', `rotate(-90)`)
      .text(yLabel);

  colorLegendGEnter
    .append('text')
      .attr('class', 'legend-label')
      .attr('x', -30)
      .attr('y', -40)
    .merge(colorLegendG.select('legend-label'));

  xAxis.tickSize(-innerHeight);
  yAxis.tickSize(-innerWidth);
  var dataset = data1.map(function(d){ 
  var ob = {date: d.date};
    var i = 0;
    for (; i < d.product.length; i++){
    ob[d.product[i].key] = d.product[i].value;
  }

  return ob; 
});

  const keys = ["Bank account or service","Consumer Loan","Credit card","Credit reporting","Debt collection","Money transfers",
  "Mortgage","Other financial service","Payday loan","Prepaid card","Student loan"];

  for(var j=0;j<dataset.length;j++){
    for(var k in keys){
      if (!dataset[j].hasOwnProperty(keys[k])) {
        dataset[j][keys[k]] = 0;
      }
    }
  };

  const stack = d3.stack()
  .keys(keys);

  const area = d3.area()
  .x(function(d) { return xScale(d.data.date); })
  .y0(function(d) { return yScale(d[0]); })
  .y1(function(d) { return yScale(d[1]); })
  .curve(d3.curveBasis);

  //console.log(dataset)
  const layers = stack(dataset);

  //console.log(keys);
  //console.log(layers);
  xScale
    .domain(d3.extent(dataset, function(d) {return d.date;}))
    .range([0, innerWidth]);

  yScale.domain([
    d3.min(layers, function (series) {
              return d3.min(series, function (d) { return d[0]; });
            }),
            d3.max(layers, function (series) {
              return d3.max(series, function (d) { return d[1]; });
            })
          ])
    .range([innerHeight, 0])
    .nice();

  colorScale.domain(keys);

  var activeProduct;

  var paths = marksG.selectAll('path').data(layers)
    .attr("class","work");


  var pathsEnter = paths
    .enter().append('path');
  pathsEnter.merge(paths)
    .attr('fill', function (d) { return colorScale(d.key); })
    .attr('d', area);

  pathsEnter
    .on("mouseover", function(d){
      activeProduct = d.key;

      var xPosition = innerWidth/2 - 100;
      var yPosition = 20 - margin.top ;

      marksG.append("text")
      .attr("id", "hoverLabel")
      .attr("x", xPosition)
      .attr("y", yPosition)
      .attr("text-anchor", "start")
      .attr("font-family", "ff-nuvo-sc-web-pro-1,ff-nuvo-sc-web-pro-2, sans-serif") 
      .attr("font-size", "20px")
      .text( activeProduct); 

      d3.selectAll("rect")
      .classed("barLight", function(d) {
        if ( d.key == activeProduct) return true;
        else return false;
      });

    }) // end of .on mouseover

    .on("mouseout", function() {
      d3.select("#hoverLabel").remove();

      d3.selectAll("rect")
      .attr("class", "barBase");

    });
    


  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

  colorLegendG.call(colorLegend);
});



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const xScale = d3.scaleBand();

const yScale = d3.scaleLinear();

const colorScale = d3.scaleOrdinal(d3.schemeCategory20);

const xAxis = d3.axisBottom()
  .scale(xScale);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .tickPadding(15);

const colorLegend = d3.legendColor()
  .scale(colorScale)
  .shapePadding(3)
  .shapeWidth(15)
  .shapeHeight(15)
  .labelOffset(4);

/* harmony default export */ __webpack_exports__["a"] = (function (svg, props) {
  const { 
    data2,
    xValue,
    xLabel,
    yValue,
    yLabel,
    colorValue,
    colorLabel,
    margin
  } = props;

  svg.selectAll("*").remove();
  const layerColumn = colorValue;
  
  //svg = d3.select('svg');
  const width = svg.attr('width');
  const height = svg.attr('height');
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  let g = svg.selectAll('.container').data([null]);
  const gEnter = g.enter().append('g').attr('class','container');
  g = gEnter
    .merge(g)
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // const g = svg.append('g')
  //           .attr('transform', `translate(${margin.left},${margin.top - 12})`);

  const xAxisGEnter = gEnter.append('g').attr('class','x-axis');
  const xAxisG = xAxisGEnter
    .merge(g.select('.x-axis'))
      .attr("transform", `translate(0, ${innerHeight})`);

  // const xAxisG = g.append('g').attr('transform', `translate(0, ${innerHeight -3})`);
  // const yAxisG = g.append('g');

  const yAxisGEnter = gEnter.append('g').attr('class','y-axis');
  const yAxisG = yAxisGEnter.merge(g.select('.y-axis'));


  const colorLegendGEnter = gEnter.append('g').attr('class', 'legend');
  const colorLegendG = colorLegendGEnter
    .merge(g.select('.legend'))
      .attr('transform', `translate(${innerWidth + 60}, 50)`);

const barsG = g.append('g')

xAxisGEnter
.append('text')
  .attr('class', 'axis-label')
  .attr('y', 76)
.merge(xAxisG.select('.axis-label'))
  .attr('x', innerWidth / 2);

// xAxisG.append('text')
//     .attr('class', 'axis-label')
//     .attr('x', innerWidth / 2)
//     .attr('y', 76);

yAxisGEnter
  .append('text')
    .attr('class', 'axis-label')
    .attr('y', -60)
    .style('text-anchor', 'middle')
  .merge(yAxisG.select('.axis-label'))
    .attr('x', -innerHeight / 2 - 3)
    .attr('transform', `rotate(-90)`)
    .text(yLabel);

  // yAxisG.append('text')
  //   .attr('class', 'axis-label')
  //   .attr('x', -innerHeight / 2 - 3)
  //   .attr('y', -57)
  //   .attr('transform', `rotate(-90)`)
  //   .style('text-anchor', 'middle')
  //   .text(yLabel);

colorLegendGEnter
    .append('text')
      .attr('class', 'legend-label')
      .attr('x', -30)
      .attr('y', -40)
    .merge(colorLegendG.select('legend-label'));

  // var colorLegendG = g.append("g")
  //   .attr("class", "color-legend")
  //   .attr('transform', `translate(${innerWidth + 60}, 150)`);

  xAxis.tickSize(-innerHeight);
  yAxis.tickSize(-innerWidth);


  var dataset = data2.map(function(d){ 
  var ob = { issue: d.issue};
    var i = 0;
    for (; i < d.product.length; i++){
    ob[d.product[i].key] = d.product[i].value;
  }

  return ob; 
});


  const keys = ["Bank account or service","Consumer Loan","Credit card","Credit reporting","Debt collection","Money transfers",
  "Mortgage","Other financial service","Payday loan","Prepaid card","Student loan"];

  for(var j=0;j<dataset.length;j++){
    for(var k in keys){
      if (!dataset[j].hasOwnProperty(keys[k])) {
        dataset[j][keys[k]] = 0;
      }
    }
  };

  console.log(dataset)
  
  var stack = d3.stack()
    .keys(keys);

  var stacked = stack(dataset);
  console.log(stacked)

  xScale
    .domain(data2.map(function (d) { return d.issue; }))
    .range([0, innerWidth]);

  yScale
    .domain([0, d3.max(stacked.map(function (d){
      return d3.max(d, function (d){ return d[1];});
    }))])
    .range([innerHeight, 0])
    .nice();

  colorScale
    .domain(keys)

  xAxisG.call(xAxis);
  xAxisG.selectAll('.tick text')
    .attr('transform', 'rotate(-45)')
    .attr('text-anchor', 'end')
    .attr('alignment-baseline', 'middle')
    .attr('x', -5)
    .attr('y', 6)
    .attr('dy', 0);


  yAxisG.call(yAxis);

  var groups = barsG.selectAll('g')
    .data(stacked)
    .enter()
    .append("g")
    .style('fill', function(d) { return colorScale(d.key); });
    
  var rects = groups.selectAll('rect')
    .data(function (d) { return d; })
    .enter()
    .append("rect")
    .attr('width', xScale.bandwidth())
    .attr('x', function(d){return xScale(d.data.issue);})
    .attr('y', function (d) { return yScale(d[1]); })
    .attr('height', function (d) { return yScale(d[0]) - yScale(d[1]); });


  colorLegendG.call(colorLegend);

  rects
    .on("mouseover",function(d) {
      var activeIssue = d.data.issue;
      var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
      var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + innerHeight / 2 + 350;
          //Update the tooltip position and value

      d3.select("#tooltip")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")           
        .select("#value")
        .text(activeIssue + ": " + (d[1]-d[0]));
         
          //Show the tooltip
      d3.select("#tooltip").classed("hidden", false);
    })
    .on("mouseout", function() {
         
          //Hide the tooltip
      d3.select("#tooltip").classed("hidden", true);
          
    });
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const xScale = d3.scaleBand();

const yScale = d3.scaleLinear();

const colorScale = d3.scaleOrdinal(d3.schemeCategory20);

const xAxis = d3.axisBottom()
  .scale(xScale);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .tickPadding(15);

const colorLegend = d3.legendColor()
  .scale(colorScale)
  .shapePadding(3)
  .shapeWidth(15)
  .shapeHeight(15)
  .labelOffset(4);


/* harmony default export */ __webpack_exports__["a"] = (function (svg, props) {
  const { 
    data3,
    xValue,
    xLabel,
    yValue,
    yLabel,
    colorValue,
    colorLabel,
    margin
  } = props;

  svg.selectAll("*").remove();
  const layerColumn = colorValue;
  
  //svg = d3.select('svg');
  const width = svg.attr('width');
  const height = svg.attr('height');
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  let g = svg.selectAll('.container').data([null]);
  const gEnter = g.enter().append('g').attr('class','container');
  g = gEnter
    .merge(g)
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // const g = svg.append('g')
  //           .attr('transform', `translate(${margin.left},${margin.top - 12})`);

  const xAxisGEnter = gEnter.append('g').attr('class','x-axis');
  const xAxisG = xAxisGEnter
    .merge(g.select('.x-axis'))
      .attr("transform", `translate(0, ${innerHeight})`);

  // const xAxisG = g.append('g').attr('transform', `translate(0, ${innerHeight -3})`);
  // const yAxisG = g.append('g');

  const yAxisGEnter = gEnter.append('g').attr('class','y-axis');
  const yAxisG = yAxisGEnter.merge(g.select('.y-axis'));


  const colorLegendGEnter = gEnter.append('g').attr('class', 'legend');
  const colorLegendG = colorLegendGEnter
    .merge(g.select('.legend'))
      .attr('transform', `translate(${innerWidth + 60}, 50)`);

const barsG = g.append('g')
 

xAxisGEnter
.append('text')
  .attr('class', 'axis-label')
  .attr('y', 76)
.merge(xAxisG.select('.axis-label'))
  .attr('x', innerWidth / 2);

// xAxisG.append('text')
//     .attr('class', 'axis-label')
//     .attr('x', innerWidth / 2)
//     .attr('y', 76);

yAxisGEnter
  .append('text')
    .attr('class', 'axis-label')
    .attr('y', -60)
    .style('text-anchor', 'middle')
  .merge(yAxisG.select('.axis-label'))
    .attr('x', -innerHeight / 2 - 3)
    .attr('transform', `rotate(-90)`)
    .text(yLabel);

  // yAxisG.append('text')
  //   .attr('class', 'axis-label')
  //   .attr('x', -innerHeight / 2 - 3)
  //   .attr('y', -57)
  //   .attr('transform', `rotate(-90)`)
  //   .style('text-anchor', 'middle')
  //   .text(yLabel);

colorLegendGEnter
    .append('text')
      .attr('class', 'legend-label')
      .attr('x', -30)
      .attr('y', -40)
    .merge(colorLegendG.select('legend-label'));

  // var colorLegendG = g.append("g")
  //   .attr("class", "color-legend")
  //   .attr('transform', `translate(${innerWidth + 60}, 150)`);

  xAxis.tickSize(-innerHeight);
  yAxis.tickSize(-innerWidth);


  var dataset = data3.map(function(d){ 
  var ob = { company: d.company};
    var i = 0;
    for (; i < d.product.length; i++){
    ob[d.product[i].key] = d.product[i].value;
  }

  return ob; 
});


  const keys = ["Bank account or service","Consumer Loan","Credit card","Credit reporting","Debt collection","Money transfers",
  "Mortgage","Other financial service","Payday loan","Prepaid card","Student loan"];

  for(var j=0;j<dataset.length;j++){
    for(var k in keys){
      if (!dataset[j].hasOwnProperty(keys[k])) {
        dataset[j][keys[k]] = 0;
      }
    }
  };

  console.log(dataset)
  
  var stack = d3.stack()
    .keys(keys);

  var stacked = stack(dataset);
  console.log(stacked)

  xScale
    .domain(data3.map(function (d) { return d.company; }))
    .range([0, innerWidth]);

  yScale
    .domain([0, d3.max(stacked.map(function (d){
      return d3.max(d, function (d){ return d[1];});
    }))])
    .range([innerHeight, 0])
    .nice();

  colorScale
    .domain(keys)

  xAxisG.call(xAxis);
  //xAxisG.selectAll('.tick line').remove();
  xAxisG.selectAll('.tick text')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end')
    .attr('alignment-baseline', 'middle')
    .attr('x', -5)
    .attr('y', 6)
    .attr('dy', 0);


  yAxisG.call(yAxis);

  var groups = barsG.selectAll('g')
    .data(stacked)
    .enter()
    .append("g")
    .style('fill', function(d) { return colorScale(d.key); });
    
  var rects = groups.selectAll('rect')
    .data(function (d) { return d; })
    .enter()
    .append("rect")
    .attr('width', xScale.bandwidth())
    .attr('x', function(d){return xScale(d.data.company);})
    .attr('y', function (d) { return yScale(d[1]); })
    .attr('height', function (d) { return yScale(d[0]) - yScale(d[1]); });

  colorLegendG.call(colorLegend)
      .selectAll('.cell text')
      .attr('dy', '0.1em');

  rects
  .on("mouseover",function(d) {
    var activeCompany = d.data.company;
    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
    var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + innerHeight / 2 + 700;
        //Update the tooltip position and value

    d3.select("#tooltip")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px")           
      .select("#value")
      .text(activeCompany + ": " + (d[1]-d[0]));
       
        //Show the tooltip
    d3.select("#tooltip").classed("hidden", false);
  })
  .on("mouseout", function() {
       
        //Hide the tooltip
    d3.select("#tooltip").classed("hidden", true);
        
  });

      

});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const xScale = d3.scaleBand();

const yScale = d3.scaleLinear();

const colorScale = d3.scaleOrdinal(d3.schemeCategory20);

const xAxis = d3.axisBottom()
  .scale(xScale);

const yAxis = d3.axisLeft()
  .scale(yScale)
  .tickPadding(15);

const colorLegend = d3.legendColor()
  .scale(colorScale)
  .shapePadding(3)
  .shapeWidth(15)
  .shapeHeight(15)
  .labelOffset(4);


/* harmony default export */ __webpack_exports__["a"] = (function (svg, props) {
  const { 
    data4,
    xValue,
    xLabel,
    yValue,
    yLabel,
    colorValue,
    colorLabel,
    margin
  } = props;

  svg.selectAll("*").remove();
  const layerColumn = colorValue;
  
  //svg = d3.select('svg');
  const width = svg.attr('width');
  const height = svg.attr('height');
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  let g = svg.selectAll('.container').data([null]);
  const gEnter = g.enter().append('g').attr('class','container');
  g = gEnter
    .merge(g)
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // const g = svg.append('g')
  //           .attr('transform', `translate(${margin.left},${margin.top - 12})`);

  const xAxisGEnter = gEnter.append('g').attr('class','x-axis');
  const xAxisG = xAxisGEnter
    .merge(g.select('.x-axis'))
      .attr("transform", `translate(0, ${innerHeight})`);

  // const xAxisG = g.append('g').attr('transform', `translate(0, ${innerHeight -3})`);
  // const yAxisG = g.append('g');

  const yAxisGEnter = gEnter.append('g').attr('class','y-axis');
  const yAxisG = yAxisGEnter.merge(g.select('.y-axis'));


  const colorLegendGEnter = gEnter.append('g').attr('class', 'legend');
  const colorLegendG = colorLegendGEnter
    .merge(g.select('.legend'))
      .attr('transform', `translate(${innerWidth + 60}, 50)`);

const barsG = g.append('g')

xAxisGEnter
.append('text')
  .attr('class', 'axis-label')
  .attr('y', 76)
.merge(xAxisG.select('.axis-label'))
  .attr('x', innerWidth / 2);

// xAxisG.append('text')
//     .attr('class', 'axis-label')
//     .attr('x', innerWidth / 2)
//     .attr('y', 76);

yAxisGEnter
  .append('text')
    .attr('class', 'axis-label')
    .attr('y', -60)
    .style('text-anchor', 'middle')
  .merge(yAxisG.select('.axis-label'))
    .attr('x', -innerHeight / 2 - 3)
    .attr('transform', `rotate(-90)`)
    .text(yLabel);

  // yAxisG.append('text')
  //   .attr('class', 'axis-label')
  //   .attr('x', -innerHeight / 2 - 3)
  //   .attr('y', -57)
  //   .attr('transform', `rotate(-90)`)
  //   .style('text-anchor', 'middle')
  //   .text(yLabel);

colorLegendGEnter
    .append('text')
      .attr('class', 'legend-label')
      .attr('x', -30)
      .attr('y', -40)
    .merge(colorLegendG.select('legend-label'));

  // var colorLegendG = g.append("g")
  //   .attr("class", "color-legend")
  //   .attr('transform', `translate(${innerWidth + 60}, 150)`);

  xAxis.tickSize(-innerHeight);
  yAxis.tickSize(-innerWidth);


  var dataset = data4.map(function(d){ 
  var ob = { state: d.state};
    var i = 0;
    for (; i < d.product.length; i++){
    ob[d.product[i].key] = d.product[i].value;
  }

  return ob; 
});


  const keys = ["Bank account or service","Consumer Loan","Credit card","Credit reporting","Debt collection","Money transfers",
  "Mortgage","Other financial service","Payday loan","Prepaid card","Student loan"];

  for(var j=0;j<dataset.length;j++){
    for(var k in keys){
      if (!dataset[j].hasOwnProperty(keys[k])) {
        dataset[j][keys[k]] = 0;
      }
    }
  };

  console.log(dataset)
  
  var stack = d3.stack()
    .keys(keys);

  var stacked = stack(dataset);
  console.log(stacked)

  xScale
    .domain(data4.map(function (d) { return d.state; }))
    .range([0, innerWidth]);

  yScale
    .domain([0, d3.max(stacked.map(function (d){
      return d3.max(d, function (d){ return d[1];});
    }))])
    .range([innerHeight, 0])
    .nice();

  colorScale
    .domain(keys)

  xAxisG.call(xAxis);
  //xAxisG.selectAll('.tick line').remove();
  xAxisG.selectAll('.tick text')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end')
    .attr('alignment-baseline', 'middle')
    .attr('x', -5)
    .attr('y', 6)
    .attr('dy', 0);


  yAxisG.call(yAxis);

  var groups = barsG.selectAll('g')
    .data(stacked)
    .enter()
    .append("g")
    .style('fill', function(d) { return colorScale(d.key); });
    
  var rects = groups.selectAll('rect')
    .data(function (d) { return d; })
    .enter()
    .append("rect")
    .attr('width', xScale.bandwidth())
    .attr('x', function(d){return xScale(d.data.state);})
    .attr('y', function (d) { return yScale(d[1]); })
    .attr('height', function (d) { return yScale(d[0]) - yScale(d[1]); });

  colorLegendG.call(colorLegend)
      .selectAll('.cell text')
      .attr('dy', '0.1em');

  rects
  .on("mouseover",function(d) {
    var activeState = d.data.state;
    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
    var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + innerHeight / 2 + 1050;
        //Update the tooltip position and value

    d3.select("#tooltip")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px")           
      .select("#value")
      .text(activeState + ": " + (d[1]-d[0]));
       
        //Show the tooltip
    d3.select("#tooltip").classed("hidden", false);
  })
  .on("mouseout", function() {
       
        //Hide the tooltip
    d3.select("#tooltip").classed("hidden", true);
        
  });

      

});

/***/ })
/******/ ]);