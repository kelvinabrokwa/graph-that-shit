/**
 * URL fetch component
 */
export default class URLInput extends React.Component {
  onChange(e) {
    fetch(e.target.value)
      .then(res => res.json())
      .then(data => this.props.setData(data))
      .catch(e => console.log(e));
  }
  render() {
    return <div>
      <input style={{ height: '30px' }} className='full-width center' type='text' placeholder='fetch data from url' onChange={this.onChange.bind(this)}/>
    </div>;
  }
}
