/**
 * Table Component
 */
export default class Table extends React.Component {
  render() {
    var { data } = this.props;
    return <div>
      <table>
        <thead>
          <tr>
            <td className='right br padx1'>x</td>
            <td className='padx1'>y</td>
          </tr>
        </thead>
        <tbody>
          {data.map(d => <tr key={d.x}>
            <td className='right br padx1'>{d.x}</td>
            <td className='padx1'>{d.y}</td>
          </tr>)}
        </tbody>
      </table>
    </div>;
  }
}
