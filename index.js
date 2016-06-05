import BarChart from './src/bar_chart';
import Table from './src/table';
import URLInput from './src/url_input';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  setData(data) {
    this.setState({ data });
  }
  render() {
    return <div className='limiter'>
      <div className='center'>graph that shit</div>
      <div>
        <URLInput setData={this.setData.bind(this)}/>
      </div>
      <div className='flex'>
        <div className='flex-3'>
          <BarChart data={this.state.data}/>
        </div>
        <div className='flex-1'>
          <Table data={this.state.data}/>
        </div>
      </div>
    </div>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
