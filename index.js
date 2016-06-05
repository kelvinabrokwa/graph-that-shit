import BarChart from './src/bar_chart';
import Table from './src/table';

var data = [
  { 'x': 'first', 'y': 1 },
  { 'x': 'second', 'y': 2 },
  { 'x': 'third', 'y': 3 },
  { 'x': 'fourth', 'y': 4 },
  { 'x': 'fifth', 'y': 5 },
  { 'x': 'sixth', 'y': 6 }
];

class App extends React.Component {
  render() {
    return <div className='limiter'>
      <div className='center'>graph that shit</div>
      <div className='flex'>
        <div className='flex-3'>
          <BarChart data={data}/>
        </div>
        <div className='flex-1'>
          <Table data={data}/>
        </div>
      </div>
    </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
