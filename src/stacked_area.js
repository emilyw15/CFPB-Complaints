
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

  const areaColumn = colorValue;

  var parseTime = d3.timeParse("%Y-%m");

  //svg.select("svg")

  const width = svg.attr('width');
  const height = svg.attr('height');
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  var g = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

  var xAxisG = g.append("g")
  .attr("transform", `translate(0, ${innerHeight})`);
  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', innerWidth / 2)
    .attr('y', 100)
    .text(xLabel);

  var yAxisG = g.append("g");
  yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('x', -innerHeight / 2)
    .attr('y', -60)
    .attr('transform', `rotate(-90)`)
    .style('text-anchor', 'middle')
    .text(yLabel);

  var colorLegendG = g.append("g")
  .attr("class", "color-legend")
  .attr('transform', `translate(${innerWidth + 60}, 150)`);

  xAxis.tickSize(-innerHeight);
  yAxis.tickSize(-innerWidth);

  data1.forEach(function(d) {
    d.date = parseTime(d.date);
  })

  var dataset = data1.map(function(d){ 
  var ob = {date: d.date};
    var i = 0;
    for (; i < d.product.length; i++){
    ob[d.product[i].key] = d.product[i].value;
  }

  return ob; 
});

  const keys = ["Bank account or service","Consumer Loan","Credit card","Credit reporting","Debt collection","Money transfers",
  "Mortgage","Other financial service","Payday loan","Prepaid card","Student loan","Virtual currency"];

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
  .y1(function(d) { return yScale(d[1]); });

  console.log(dataset)
  const layers = stack(dataset);

  console.log(keys);
  console.log(layers);

  xScale
    .domain(d3.extent(dataset, function(d) { return d.date;}))
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

  var layer = g.selectAll(".layer")
    .data(layers)
    .enter().append("g")
    .attr("class", "layer");

  layer.append("path")
      .attr("class", "area")
      .style("fill", function(d) { return colorScale(d.key); })
      .attr("d", area);


  xAxisG.call(xAxis);
  yAxisG.call(yAxis);

  colorLegendG.call(colorLegend);
}


