import BarChart from './bar_chart';

var data = [{x: '1', y:1}, {x: '2', y: 2}];

class App extends React.Component {
  render() {
    return <div>
      <BarChart data={data}/>
    </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
