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
    this.yAxisLabel = props.yAxisLabel || '';
    this.color = props.color || '#00AFD8';
  }

  componentDidMount() {
    var { id, data } = this.props;

    // setup
    var pad = {
      top: 30,
      bottom: 150,
      right: 40,
      left: 40
    };
    var width = parseInt(d3.select(`#bar-chart-${id}`).style('width'), 10) - pad.left - pad.right;
    var height = this.height = 700 - pad.top - pad.bottom;


    var svgEl = d3.select(`#bar-chart-${id}`).append('svg');
    var svg = this.svg = svgEl
        .attr('id', `bar-chart-svg-${id}`)
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
      .attr('class', `x axis x-axis-${id}`)
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .selectAll('text')
        .text(t => t ? t.substring(0, t.length <= 13 ? t.length - 1 : 12) : 'Null')
        .attr('transform', 'rotate(-65)')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .style('text-anchor', 'end');

    svg.append('g')
      .attr('class', `y axis y-axis-${id}`)
      .call(yAxis)
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .attr('class', 'chart-text-gray')
        .text(this.yAxisLabel);


    // bars
    svg.selectAll(`.bar-${id}`)
        .data(data, d => d.x)
      .enter().append('rect')
        .attr('fill', '#00AFD8')
        .attr('class', `bar bar-${id}`)
        .attr('x', d => x(d.x))
        .attr('width', x.rangeBand())
        .attr('y', d => y(d.y))
        .attr('height', d => height - y(d.y));

    // bar labels
    svg.selectAll(`.bar-label-${id}`)
        .data(data, d => d.x)
      .enter().append('text')
        .text(d => d.y)
        .attr('x', d => x(d.x) + x.rangeBand() / 2)
        .attr('y', d => y(d.y) - 3)
        .attr('class', `bar-label-${id}`)
        .style('text-anchor', 'middle');
  }

  componentWillReceiveProps(props) {
    var { data, id } = props;
    var { x, y, svg, xAxis, yAxis, height } = this;

    // update scales
    x.domain(data.map(d => d.x));
    y.domain([0, d3.max(data.map(d => d.y))]);

    // update axes
    svg.selectAll(`.x-axis-${id}`)
      .transition()
        .duration(300)
      .call(xAxis)
      .selectAll('text')
        .text(t => t ? t.substring(0, t.length <= 13 ? t.length - 1 : 12) : 'Null')
        .attr('transform', 'rotate(-65)')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .style('text-anchor', 'end');

    svg.selectAll(`.y-axis-${id}`)
      .transition()
        .duration(300)
      .call(yAxis);

    // update bars
    var bars = svg.selectAll(`.bar-${id}`).data(data, d => d.x);

    bars.exit()
      .transition()
        .duration(300)
      .attr('y', y(0))
      .attr('height', height - y(0))
      .style('fill-opacity', 1e-6)
      .remove();

    bars.enter().append('rect')
      .attr('class', `bar bar-${id}`)
      .attr('y', y(0))
      .attr('fill', this.color)
      .attr('height', d => height - y(0));

    bars
      .transition()
        .duration(300)
      .attr('x', d => x(d.x))
      .attr('width', x.rangeBand())
      .attr('y', d => y(d.y))
      .attr('height', d => height - y(d.y));

    // update labels
    var labels = svg.selectAll(`.bar-label-${id}`).data(data, d => d.x);

    labels.enter().append('text')
      .attr('class', `bar-label-${id}`);

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
      <div id={`bar-chart-${this.props.id}`}></div>
    </div>;
  }

}
