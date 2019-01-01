import React, { Component } from 'react';
import './../node_modules/bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import randomId from './random';
import like from './png/like.png';
import dislike from './png/dislike.png';
import transp from './png/transp.png';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      input1: '',
      input2: '',
      operation: '+',
      dropDownOpt: [
        {value: '+', label: '+'},
        {value: '-', label: '-'},
        {value: '/', label: '÷'},
        {value: 'x', label: 'x'},
      ]
    }
  }

  addRow() {
    const rows = this.state.rows;
    rows.push({
      id: randomId(10),
      input1: this.state.input1,
      input2: this.state.input2,
      operation: this.state.operation,
      success: '',
      result: ''
    });
    return rows;
  }

  clearFields() {
    this.setState({
      input1: '',
      input2: '',
      operation: '+',
    })
  }

  editRow(id, element, value) {
    const rows = this.state.rows;
    const row = rows.filter(el => el.id === id)[0];
    row[element] = value;
    rows.map(el =>
      el.id === id ? row : el);
    this.setState({
      rows: rows
    });
  }

  checkRow(id) {
    let result;
    const row = this.state.rows.filter(el => el.id === id)[0];
    if (row.operation === '+') {
      result = +row.input1 + +row.input2;
    } else if (row.operation === '-') {
      result = +row.input1 - +row.input2;
    } else if (row.operation === '/') {
      result = +row.input1 / +row.input2;
    } else if (row.operation === 'x') {
      result = +row.input1 * +row.input2;
    }

    if (result.toString() === row.result) {
      this.editRow(id, 'success', true)
    } else {
      this.editRow(id, 'success', false)
    }
  }

  disabled(id) {
    const row = this.state.rows.filter(el => el.id === id)[0];
    return row.success;
  }

  successBadge(id) {
    const row = this.state.rows.filter(el => el.id === id)[0];
    if (row.success === '') {
      return <td>
        <img src={transp} alt="transparent" height={38}/>
      </td>
    } else if (row.success) {
      return <td>
        <img src={like} alt="like" height={38}/>
      </td>
    } else {
      return <td>
        <img src={dislike} alt="dislike" height={38}/>
      </td>
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center card-footer">Home Math</h1>

        <table>
          <tbody>

          <tr>
            <td width="45%">
              <input className="form-control mt-1  text-center"
                     onChange={(e) => this.setState({input1: e.target.value})}
                     type="number"
                     value={this.state.input1}/>
            </td>

            <td width="10%">
              <Dropdown options={this.state.dropDownOpt}
                        className="text-center"
                        onChange={(e) => this.setState({operation: e.value})}
                        value={this.state.operation}/>
            </td>

            <td width="45%">
              <input className="form-control mt-1 text-center"
                     onChange={(e) => this.setState({input2: e.target.value})}
                     type="number"
                     value={this.state.input2}/>
            </td>

            <td>
              <div className="text-center mt-1">
                <button className="btn btn-primary"
                        onClick={() => this.setState({
                          rows: this.addRow()
                        }, () => this.clearFields())}>
                  +
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>

        <table className="mt-3 table">
          <tbody>

          {this.state.rows.map(el =>
            <tr key={el.id}>
              <td><h2 className="text-center">{el.input1}</h2></td>

              <td>
                <h2 className="text-center">{this.state.dropDownOpt.filter(i => i.value === el.operation)[0].label}</h2>
              </td>

              <td><h2 className="text-center">{el.input2}</h2></td>

              <td>
                <div className="text-center"><h2>=</h2></div>
              </td>

              <td>
                <input className="form-control text-center"
                       type="number"
                       onChange={(e) => this.editRow(el.id, 'result', e.target.value)}
                       disabled={this.disabled(el.id)}
                />
              </td>

              <td>
                <button className="btn btn-secondary"
                        onClick={() => this.checkRow(el.id)}>?
                </button>
              </td>

              {this.successBadge(el.id)}

            </tr>
          )}

          </tbody>
        </table>

      </div>
    );
  }
}

export default App;
