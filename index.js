import BarChart from './bar_chart';

var data = [
    { 'x': '1', 'y': 1 },
    { 'x': '2', 'y': 2 },
    { 'x': '3', 'y': 3 },
    { 'x': '4', 'y': 4 },
    { 'x': '5', 'y': 5 },
    { 'x': '6', 'y': 6 }
]

class App extends React.Component {
  render() {
    return <div>
      <div className='center'>graph that shit</div>
      <BarChart data={data}/>
    </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
