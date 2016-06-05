/**
 * Textarea
 */
export default class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid: false
    };
  }
  onChange(e) {
    try {
      this.props.setData(JSON.parse(e.target.value));
      this.setState({ invalid: false });
    } catch (e) {
      this.setState({ invalid: true });
    }
  }
  render() {
    return <div>
      <textarea
        placeholder='paste json here'
        className='full-width center'
        onChange={this.onChange.bind(this)}
        style={{ color: this.state.invalid ? 'red' : 'black', height: '30px' }}
      />
    </div>;
  }
}
