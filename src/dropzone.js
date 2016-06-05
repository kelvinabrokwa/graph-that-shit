import Dropzone from 'react-dropzone';

/**
 *
 */
export default class DropzoneWrapper extends React.Component {
  onDrop(file) {
    var reader = new FileReader();
    reader.onload = e => {
      this.props.setData(JSON.parse(e.target.result));
    };
    reader.readAsText(file[0]);
  }
  render() {
    return <div>
      <Dropzone onDrop={this.onDrop.bind(this)} style={style}>
        <div>or drop a file here</div>
      </Dropzone>
    </div>;
  }
}

var style = {
  textAlign: 'center',
  border: '2px dashed #BBB',
  color: '#BBB',
  fontSize: '11px',
  height: '30px'
};
