
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

export default function (svg, props) {
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

  var paths = marksG.selectAll('path').data(layers);


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
}

