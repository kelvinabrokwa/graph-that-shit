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
      <input type='text' placeholder='fetch data' onChange={this.onChange.bind(this)}/>
    </div>;
  }
}
