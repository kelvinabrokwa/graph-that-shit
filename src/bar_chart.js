/**
 * Bar chart component
 * Expects data in the shape
 * [
 *   { x: <String>, y: <Number> },
 *   ...
 * ]
 */
export default class BarChart extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var { data } = this.props;

    // setup
    var pad = {
      top: 30,
      bottom: 30,
      right: 40,
      left: 40
    };
    var width = parseInt(d3.select('#bar-chart').style('width'), 10) - pad.left - pad.right;
    var height = this.height = 500 - pad.top - pad.bottom;

    var svgEl = d3.select('#bar-chart').append('svg');
    var svg = this.svg = svgEl
        .attr('id', 'bar-chart-svg')
        .attr('width', width + pad.left + pad.right)
        .attr('height', height + pad.top + pad.bottom)
        .attr('class', 'chart')
      .append('g')
        .attr('transform', `translate(${pad.left},${pad.top})`);

    //scales
    var x = this.x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1)
      .domain(data.map(d => d.x));
    var y = this.y = d3.scale.linear()
      .domain([0, d3.max(data.map(d => d.y))])
      .range([height, 0]);

    // axes
    var xAxis = this.xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');
    var yAxis = this.yAxis = d3.svg.axis()
      .scale(y)
      .orient('left');

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // bars
    svg.selectAll(`.bar`)
        .data(data)
      .enter().append('rect')
        .attr('fill', '#00AFD8')
        .attr('class', `bar bar`)
        .attr('x', d => x(d.x))
        .attr('width', x.rangeBand())
        .attr('y', d => y(d.y))
        .attr('height', d => height - y(d.y));

    // bar labels
    svg.selectAll(`.bar-label`)
        .data(data)
      .enter().append('text')
        .text(d => d.y)
        .attr('x', d => x(d.x) + x.rangeBand() / 2)
        .attr('y', d => y(d.y) - 3)
        .attr('class', `bar-label`)
        .style('text-anchor', 'middle');
  }

  componentWillReceiveProps(props) {
    var { data } = props;
    var { x, y, svg, xAxis, yAxis, height } = this;

    // update scales
    x.domain(data.map(d => d.x));
    y.domain([0, d3.max(data.map(d => d.y))]);

    // update axes
    svg.selectAll('.x.axis')
      .transition()
        .duration(300)
      .call(xAxis)

    svg.selectAll('.y.axis')
      .transition()
        .duration(300)
      .call(yAxis);

    // update bars
    var bars = svg.selectAll(`.bar`).data(data, d => d.x);

    bars.exit()
      .transition()
        .duration(300)
      .attr('y', y(0))
      .attr('height', height - y(0))
      .style('fill-opacity', 1e-6)
      .remove();

    bars.enter().append('rect')
      .attr('class', 'bar')
      .attr('y', y(0))
      .attr('height', d => height - y(0));

    bars
      .transition()
        .duration(300)
      .attr('x', d => x(d.x))
      .attr('width', x.rangeBand())
      .attr('y', d => y(d.y))
      .attr('height', d => height - y(d.y));

    // update labels
    var labels = svg.selectAll(`.bar-label`).data(data, d => d.x);

    labels.enter().append('text')
      .attr('class', `bar-label`);

    // bar labels
    labels
      .transition()
        .duration(300)
      .text(d => d.y)
      .attr('x', d => x(d.x) + x.rangeBand() / 2)
      .attr('y', d => y(d.y) - 3)
      .style('text-anchor', 'middle');

    labels.exit()
      .transition()
        .duration(300)
      .attr('y', y(0))
      .style('fill-opacity', 1e-6)
      .remove();
  }

  render() {
    return <div>
      <div id='bar-chart'></div>
    </div>;
  }

}
