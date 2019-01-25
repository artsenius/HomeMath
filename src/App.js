import React, { Component } from 'react';
import './../node_modules/bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import randomId from './random';
import like from './png/like.png';
import dislike from './png/dislike.png';
import transparent from './png/transp.png';
import squares from './png/squares.png';
import './css/custom.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columnView: false,
      columnInput1: '',
      columnInput2: '',
      columnOperation: '+',
      columnId: '',
      columnError: false,
      columnResult: {
        1: '',
        2: '',
        3: '',
        4: ''
      },
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

  successBadge(id, input1, input2, operation) {
    const row = this.state.rows.filter(el => el.id === id)[0];
    if (row.success === '') {
      return <td>
        <div align="center">
          <img onClick={operation === '+' || operation === '-' ?
            () => this.columnHelp(id, input1, input2, operation)
          :
            () => console.log('for future')}
               src={operation === '+' || operation === '-' ? squares : transparent}
               alt="help"
               className="button-hover"
               height={38}/>
        </div>
      </td>
    } else if (row.success) {
      return <td>
        <div align="center">
          <img src={like} alt="like" height={38}/>
        </div>
      </td>
    } else {
      return <td>
        <img src={dislike} alt="dislike" height={38}/>
      </td>
    }
  }

  columnHelp(id, input1, input2, operation) {
    this.setState({
      columnView: true,
      columnInput1: input1,
      columnInput2: input2,
      columnOperation: operation,
      columnId: id
    })
  }

  columnAddition() {
    let tableStyle = {
      fontWeight: '700',
      border: "solid black 1px",
      textAlign: "center",
      width: "100%"
    };
    return <div>
      <button className="btn btn-dark mb-2"
              onClick={() => this.clearColumnState()}>{'< Back'}</button>
      <table className="table-bordered mb-2" style={tableStyle}>
        <tbody>
        {this.columnFirstRow()}
        {this.columnSecondRow()}
        {this.columnThirdRow()}
        </tbody>
      </table>
      {this.state.columnError ?
        <div align="center">
          <span><h2 style={{color: "red"}}>Wrong Answer!</h2></span>
          <button className="btn btn-primary"
                  onClick={() => this.columnCheck()}>Check
          </button>
        </div>
        :
        <div align="center">
          <button className="btn btn-primary"
                  onClick={() => this.columnCheck()}>Check
          </button>
        </div>
      }
    </div>
  }

  columnFirstRow() {
    let array = this.state.columnInput1.split('');
    return <tr style={{fontSize: "300%"}}>
      <td height={187}> </td>
      <td height={187}>{array[array.length - 3] || ' '}</td>
      <td height={187}>{array[array.length - 2] || ' '}</td>
      <td height={187}>{array[array.length - 1]}</td>
    </tr>
  }

  columnSecondRow() {
    let array = this.state.columnInput2.split('');
    return <tr style={{fontSize: "300%"}}>
      <td height={187}>{this.state.columnOperation}</td>
      <td height={187}>{array[array.length - 3] || ' '}</td>
      <td height={187}>{array[array.length - 2] || ' '}</td>
      <td height={187}>{array[array.length - 1]}</td>
    </tr>
  }

  columnThirdRow() {
    const inputStyle = {
      fontSize: "200%",
      fontWeight: "700"
    };
    return <tr>
      <td><input className="text-center form-control" type="tel" maxLength={1} style={inputStyle}
                 onChange={(e) => this.columnResult(e.target.value, 1)}/></td>
      <td><input className="text-center form-control" type="tel" maxLength={1} style={inputStyle}
                 onChange={(e) => this.columnResult(e.target.value, 2)}/></td>
      <td><input className="text-center form-control" type="tel" maxLength={1} style={inputStyle}
                 onChange={(e) => this.columnResult(e.target.value, 3)}/></td>
      <td><input className="text-center form-control" type="tel" maxLength={1} style={inputStyle}
                 onChange={(e) => this.columnResult(e.target.value, 4)}/></td>
    </tr>
  }

  columnResult(value, cell) {
    let obj = this.state.columnResult;
    obj[cell] = value;
    this.setState({
      columnResult: obj
    });
  }

  columnCheck() {
    let success = false;
    const row = (this.state.rows.filter(el => el.id === this.state.columnId)[0]);
    const res =
      +(this.state.columnResult[1] +
      this.state.columnResult[2] +
      this.state.columnResult[3] +
      this.state.columnResult[4]);
    this.state.columnOperation === '+' ?
      success = res === +row.input1 + +row.input2
      :
      this.state.columnOperation === '-' ?
        success = res === +row.input1 - +row.input2
        :
        this.state.columnOperation === 'x' ?
          success = res === +row.input1 * +row.input2
          :
          success = res === +row.input1 / +row.input2;
      success ? this.columnGood(res.toString()) : this.columnBad()
  }

  columnGood(res) {
    this.editRow(this.state.columnId, 'result', res);
    this.checkRow(this.state.columnId);
    this.clearColumnState();
    console.log(this.state);
  }

  columnBad(){
    this.setState({
      columnError: true
    })
  }

  clearColumnState() {
    this.setState({
      columnView: false,
      columnInput1: '',
      columnInput2: '',
      columnOperation: '+',
      columnId: '',
      columnError: false,
      columnResult: {
        1: '',
        2: '',
        3: '',
        4: ''
      }
    })
  }

  columnNotReady() {
    return <div align="center">
      <h2>Not Ready</h2>
      <button className="btn btn-primary"
              onClick={() => this.backRegular()}>Back
      </button>
    </div>
  }

  backRegular() {
    this.setState({columnView: false})
  }

  render() {
    return (
      <div style={{width: "80%"}} className="m-auto">
        <h1 className="text-center card-footer">Home Math</h1>

        {this.state.columnView ?

          <div>

            {this.state.columnOperation === '+' || '-' ?
              this.columnAddition()
              :
              this.columnNotReady()
            }

          </div>

          :

          <div>
            <table>
              <tbody>

              <tr>
                <td width="45%">
                  <input className="form-control mt-1  text-center"
                         onChange={(e) => this.setState({input1: e.target.value})}
                         type="tel"
                         maxLength="3"
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
                         type="tel"
                         maxLength="3"
                         value={this.state.input2}/>
                </td>

                <td>
                  <div className="text-center mt-1">
                    <button className="btn btn-primary"
                            onClick={() => this.setState({
                              rows: this.addRow()
                            }, () => this.clearFields())}>
                      ADD
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
                    <h2
                      className="text-center">{this.state.dropDownOpt.filter(i => i.value === el.operation)[0].label}</h2>
                  </td>

                  <td><h2 className="text-center">{el.input2}</h2></td>

                  <td>
                    <div className="text-center"><h2>=</h2></div>
                  </td>

                  <td>
                    <input className="form-control text-center"
                           type="number"
                           value={el.result}
                           onChange={(e) => this.editRow(el.id, 'result', e.target.value)}
                           disabled={this.disabled(el.id)}
                    />
                  </td>

                  <td>
                    <div align="center">
                      <button className="btn btn-secondary font-weight-bold"
                              onClick={() => this.checkRow(el.id)}>-?-
                      </button>
                    </div>
                  </td>

                  {this.successBadge(el.id, el.input1, el.input2, el.operation)}

                </tr>
              )}

              </tbody>
            </table>
          </div>
        }

      </div>
    );
  }
}

export default App;
