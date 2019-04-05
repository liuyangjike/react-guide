import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Guide from '../../src/index'
import './app.css'
import {data} from './data'
class App extends Component {
  constructor () {
    super()
    this.state ={
      start: false
    }
  }
  handleGiude (){
    this.setState({
      start: true
    })
  }
  handleCancel (e) {
    this.setState({
      start: false
    })
  }
  render() {
    return (
      <div className='example-container'>
        <Guide visible={this.state.start} onCancel={this.handleCancel.bind(this)} >
          <h1 className="example-header" >
            <header data-step="1" data-tip='Welcome to use react-guide'>React Guide</header>
          </h1>
          <hr/>
          <div className="example-main">
            <div className="example-left" data-step="2" data-tip='This is the basic usage of guide'>
              <h3>Basic use</h3>
              <ul >
                <li >1.Use tag <code>&#60;Guide&#62;...&#60;/Guide&#62;</code> wrap you want to guide something.</li>
                <li >2.Use <code>data-step</code> and <code>date-tip</code> attributes in dom.</li>                
              </ul>
            </div>
            <div className="example-right" data-step='3' data-tip='This is API document'>
              <h3>API</h3>
              <table className='example-api' >
                <tbody>
                {
                  data.map((line, i) => {
                    return (
                      <tr key={`tr${i}`} className={`tr${i}`}>
                        {
                          line.map((cell, j) => {
                            return (
                              <td key={`th${j}`} className={`td${j}`}>
                                {cell}
                              </td>
                            )
                          })
                        }
                      </tr>
                    )
                  })
                }
                </tbody>

              </table>
            </div>
          </div>
        </Guide>
        <button onClick={this.handleGiude.bind(this)}>start</button>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
