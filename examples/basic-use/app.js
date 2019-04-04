import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Guide from '../../src/index'
import './app.css'
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
  handleOk (e) {
    console.log(e.target.className)
  }
  render() {
    return (
      <div>
      <Guide visible={this.state.start} onCancel={this.handleCancel.bind(this)} onOk={this.handleOk.bind(this)} >
        <h1 className="example-header" >
          <header data-step="1" data-tip='Welcome to use react-guide'>React Guide</header>
        </h1>
        <div className="example-main">
          <div className="example-left">
            <ul data-step="2" data-tip='I am jike'>
              <li>1</li>
              <li>2</li>
            </ul>
          </div>
          <div>
          <header data-step="3" data-tip='how are you'>you</header>
          </div>
        </div>
    </Guide>
    <button onClick={this.handleGiude.bind(this)}>start</button>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
