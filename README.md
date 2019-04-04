# react-guide
Accessible guide component for React.JS to introduce web page

## Table of Contents

* [Installation](#installation)
* [API documentation](#api-documentation)
* [Examples](#examples)

## Installation

To install, you can use [npm](https://npmjs.org/) 


    $ npm install react-guide

## API documentation

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| visible | Whether the modal dialog is visible or not | boolean | false |
| onCancel | Specify a function that will be called when a user clicks shadow, skip button on bottom left | function(e) | - |
| audio | Whether a voice reads of tip  of the guide or not | boolean | true |
| bullet | Whether bullets (.) button is visible on middle of the guide or not | boolean | false |
| num | Whether num icon is visible on top left of the guide or not | boolean | false |
| closable | Whether a close (x) button is visible on top right of the modal dialog or not | boolean | true |
| confirmLoading | Whether to apply loading visual effect for OK button or not | boolean | false |
| destroyOnClose | Whether to unmount child components on onClose | boolean | false |
| footer | Footer content, set as `footer={null}` when you don't need default buttons | string\|ReactNode | OK and Cancel buttons |
| forceRender | Force render Modal | boolean | false |
| getContainer | Return the mount node for Modal | (instance): HTMLElement | () => document.body |
| mask | Whether show mask or not. | Boolean | true |
| maskClosable | Whether to close the modal dialog when the mask (area outside the modal) is clicked | boolean | true |
| maskStyle | Style for modal's mask element. | object | {} |
| okText | Text of the OK button | string\|ReactNode | `OK` |
| okType | Button `type` of the OK button | string | `primary` |
| okButtonProps | The ok button props | [ButtonProps](/components/button) | - |
| cancelButtonProps | The cancel button props | [ButtonProps](/components/button) | - |
| style | Style of floating layer, typically used at least for adjusting the position. | object | - |
| title | The modal dialog's title | string\|ReactNode | - |
| visible | Whether the modal dialog is visible or not | boolean | false |
| width | Width of the modal dialog | string\|number | 520 |
| wrapClassName | The class name of the container of the modal dialog | string | - |
| zIndex | The `z-index` of the Modal | Number | 1000 |
| onCancel | Specify a function that will be called when a user clicks mask, close button on top right or Cancel button | function(e) | - |
| onOk | Specify a function that will be called when a user clicks the OK button | function(e) | - |

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
            <h1 data-step="1" data-tip='Hello World,I am Jike'>11</h1>
            <div data-step="3" data-tip='nice to meet you'>22</div>
            <h4 data-step="2" data-tip='glad to use react guide' >不不不</h4>
            <div><span data-step="4" data-tip='let me start'>4444</span></div>
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