import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Guide from '../../src/index'
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
      <h1 data-step="1" data-tip='Hello World,I am Jike, Hello World,I am Jike'>11</h1>
      <div data-step="3" data-tip='222'>
        22
      </div>
      <div>
        <h4 data-step="2" data-tip='glad to use react guide' style={{marginLeft: '300px'}}>不不不不不</h4>
      </div>
      <div>
        <span data-step="4" data-tip='let me start' style={{marginLeft: '100px'}}>4444</span>
      </div>
      
    </Guide>
    <button onClick={this.handleGiude.bind(this)}>start</button>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
