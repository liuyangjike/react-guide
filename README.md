# react-guide
A reactjs component is used for web page guidance

## Table of Contents

* [Installation](#installation)
* [API documentation](#api-documentation)
* [Examples](#examples)
* [demo](#demo)

## Installation

To install, you can use [npm](https://npmjs.org/) 


    $ npm install react-guide

## API documentation

| Property | Description | Type | Default |
| --------- | ----------- | ---- | ------- |
| visible | Whether the guide is visible or not | boolean | false |
| audio | Whether a voice reads of tip  of the guide or not | boolean | true |
| lan | The voice of language, 'en' or 'zh' | string | en |
| bullet | Whether bullets (.) button is visible on middle of the guide or not | boolean | false |
| num | Whether num icon is visible on top left of the guide or not | boolean | false |
| onCancel | Specify a function that will be called when a user clicks shadow, skip button on bottom left | function(e) | - |
| onOk | Specify a function that will be called when all steps have done and click the done button | function(e) | - |
| data-step | Number of steps for guides, only use in dom | string | - |
| data-tip | Every step you want to show tip, only use in dom  | string | - |

## Examples

Here is a simple example of react-guide being used in an app

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Guide from 'react-guide'
class App extends Component {
  constructor () {
    super()
    this.state ={
      start: false
    }
  }
  handleStart(){
    this.setState({
      start: true
    })
  }
  handleCancel() {
    this.setState({
      start: false
    })
  }
  render() {
    return (
      <div>
        <Guide 
          visible={this.state.start} 
          onCancel={this.handleCancel.bind(this)} >
            <h1 data-step="1" data-tip='Hello World'>Step1</h1>
            <div data-step="3" data-tip='Welcome to use react-guide'>Step3</div>
            <h4 data-step="2" data-tip='react-guide is very easy' >Step2</h4>
            <div><span data-step="4" data-tip='Let start'>Step5</span></div>
      </Guide>
      <button onClick={this.handleStart.bind(this)}>start</button>
    </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
```
You can find more examples in the `examples` directory, which you can run in a
local development server using `npm start`.

## demo

This is a demo show guide [demo](http://www.goingtrace.com/) 


  "setupFiles": [
    "./test/setup.js"
  ],
  "moduleFileExtensions": [
    "js",
    "jsx"
  ],
  "testPathIgnorePatterns": [
    "/node_modules/"
  ],
  "testRegex": ".*\\.test\\.js$",
  "collectCoverage": false,
  "collectCoverageFrom": [
    "src/**/*.{js}"
  ],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  "transform": {
    "^.+\\.js$": "babel-jest"
  }