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
          <div className='example-button'> 
            <button onClick={this.handleGiude.bind(this)}>start</button>
            <a href="https://github.com/liuyangjike/react-guide">
              <svg aria-hidden="true" height="35" version="1.1" viewBox="0 0 16 16" width="35"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
            </a>           
          </div>
          <div className="example-main">
            <div className="example-left" data-step="2" data-tip='This is the basic usage of guide'>
              <h3>Basic use</h3>
              <ul >
                <li >1. Use tag <code>&#60;Guide&#62;...&#60;/Guide&#62;</code> wrap you want to guide something.</li>
                <li >2. Use <code>data-step</code> and <code>date-tip</code> attributes in dom.</li>                
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
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
