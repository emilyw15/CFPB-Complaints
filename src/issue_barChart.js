
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

export default function (svg, props) {
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


}
