import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {getListFromLike, text2Voice} from './utils'
import './guide.css'

class Guide extends Component {
  static defaultProps = {
    bullet: true,
    num: true,
    visible: false,
    lan: 'en',
    audio: true,
    onCancel: function () {},
    onOk: function () {}
  }
  static propTypes = {
    children: PropTypes.any,
    visible: PropTypes.bool,
    bullet: PropTypes.bool,
    num: PropTypes.bool,
    lan: PropTypes.string,
    audio: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
  }
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0,
      dots: [],
      nodeList: [],
      contentStyle: {},
      iconStyle: {},
      tipStyle: {},
      tip: '',
      arrowClass: 'top',
      audioUrl: '',
      playClass: 'audio-play'
    }
  }
  componentDidMount () {
    const nodeList = getListFromLike(this.refs.guide.querySelectorAll('[data-step]'))
    nodeList.sort((a, b) => {
      return Number(a.getAttribute('data-step'))- Number(b.getAttribute('data-step'))
    })
    let dots = nodeList.map(node => {
      let height = node.clientHeight || node.offsetHeight
      let width = node.clientWidth || node.offsetWidth
      return {
        left: node.offsetLeft,
        top: node.offsetTop,
        height,
        width,
        tip: node.getAttribute('data-tip'),
        step: node.getAttribute('data-step'),
        fRight: node.offsetLeft + width,
        fBottom: node.offsetTop + height
      }
    })
    this.setState({
      dots,
      nodeList,
    })
    window.addEventListener('resize', this.onRezieWindow.bind(this), false)
    this.onAudioFulfill()
  }
  shouldComponentUpdate (nextProps) {
    if (nextProps.visible && nextProps.visible !== this.props.visible) {
      this._setTargetIndex(this.state.nodeList[0], 0)
      this._setDot(this.state.dots[0], 0,'start')
      this.refs.audio.load()
    }
    return true
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.onRezieWindow.bind(this), false)
  }
  onRezieWindow () {
    let dot = this.state.dots[this.state.activeIndex]
    this.setState({
      tipStyle: this._getTipStyle(dot),
    })
  }
  onClickShadow (event) {
    if (event.target.className ==='guide-shadow') {
      this.refs.shadow.removeEventListener('click',this.onClickShadow.bind(this), false)
      this._closeGuide(event)
    }
  }
  onAudioFulfill () {
    this.refs.audio.addEventListener('timeupdate', () => {
      let duration = this.refs.audio.duration
      let current = this.refs.audio.currentTime
      let playClass = duration === current? 'audio-noplay' :'audio-play'
      if (playClass !== this.state.playClass){
        this.setState({
          playClass
        })
      }
    }, false)
  }
  _setDot (dot, newIndex, action) {
    let delay = action === 'start'?100:350
    this.setState({
      contentStyle: dot,
      iconStyle: this._getIconStyle(dot),
      tipStyle: {
        display: 'none',
        opacity: 0
      },
      tip: dot.tip,
      audioUrl: text2Voice(dot.tip, this.props.lan)
    })
    this._focusTarget(newIndex)
    var timer = setTimeout(() => {
      this.setState({
        tipStyle: this._getTipStyle(dot),
      })
      clearTimeout(timer)
    }, delay)
    this._playAudio()
  }
  _getIconStyle (dot) {
    return {
      top: dot.top - 17,
      left: dot.left - 17,
      width: '20px',
      height: '20px',
    }
  }
  _getTipStyle (dot) {
    var winH = window.innerHeight
    var winW = window.innerWidth
    var gap = 12
    var arrowClass = ''
    var tipObj = {opacity: 1}
    if (winH - dot.fBottom > 200) {
      arrowClass= 'top'
      tipObj = {top: dot.height + gap, left: 0}
    } else if (winH - dot.top > 200) {
      arrowClass = 'bottom'
      tipObj = {bottom: dot.height + gap, left: 0}
    } else if (dot.left > 200) {
      arrowClass= 'right'
      tipObj =  {top: 0, right: dot.width + gap}
    } else if (winW - dot.fRight > 200) {
      arrowClass = 'left'
      tipObj = {top: 0, left: dot.width+ gap}
    } else {
      tipObj = {display: 'none'}
    }
    this.setState({
      arrowClass
    })
    return tipObj
  }
  _setTargetIndex (node, newIndex) {
    node.style.setProperty('position', 'relative');
    node.style.setProperty('z-index', '999996', 'important');
    if (newIndex !== this.state.activeIndex) {
      this._removeActive()
    }
  }
  _playAudio () {
    this.refs.audio.autoplay = true
  }
  _focusTarget(targetIndex) {
    var {top, bottom, left, right} = this.state.nodeList[targetIndex].getBoundingClientRect()
    let dTop = this.state.dots[targetIndex].top
    if (top > window.innerHeight) {
      window.scrollTo(0, top + window.scrollY - 20)
    } else if (top < 0) {
      window.scrollTo(0, dTop -20)
    }
  }
  _removeActive() {
    let lastNode = this.state.nodeList[this.state.activeIndex]
    lastNode.style.setProperty('position', '');
    lastNode.style.setProperty('z-index', 'auto');
  }
  _closeGuide (event) {
    this.setState({
      activeIndex: 0
    })
    this.refs.audio.pause()
    this.props.onCancel(event)
  }
  handleChangeStep (direction, jump) {
    let newIndex =/\d+/g.test(jump)?jump: (this.state.activeIndex + direction)
    this.setState({
      activeIndex: newIndex
    })
    this._setDot(this.state.dots[newIndex], newIndex)
    this._setTargetIndex(this.state.nodeList[newIndex], newIndex)
  }
  handleJumpStep (event) {
    event = event || window.event;
    let reg = /^dot\d/g
    if (reg.test(event.target.id)) {
      let jump = event.target.id.slice(-1)
      this.handleChangeStep(1, Number(jump))
    }
  }
  handleSkip(event) {
    event = event || window.event;
    this._removeActive()
    if (this.state.activeIndex === this.state.dots.length - 1) {
      this.props.onOk(event)
    }
    this._closeGuide(event)
  }
  render () {
      var nextDisabled = this.state.activeIndex === this.state.dots.length - 1
      var backDisabled = !this.state.activeIndex
      var guideNodes = [
        <div className="guide-shadow" ref='shadow' onClick={this.onClickShadow.bind(this)} key='guide-shadow'></div>,
        <div className="guide-content" key='guide-content' style={this.state.contentStyle} >
          <div className="guide-tooltip" style={this.state.tipStyle} >
            <div>{this.state.tip}</div>
            {this.props.bullet&&<div className='guide-bullets'>
              <ul onClick={this.handleJumpStep.bind(this)}>
                {
                  this.state.dots.map((dot, index) => {
                    return (
                      <li key={`dot${index}`}>
                        <div id={`dot${index}`} 
                          className={index === this.state.activeIndex
                                        ?'active-dot':''}></div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            }
            <div className='guide-button-group'>
              <button className="guide-button guide-button-total" onClick={this.handleSkip.bind(this)}>
                {nextDisabled?'done':'skip'}
              </button>
              <div>
                <button className={`guide-button guide-button-left ${backDisabled?'guide-button-disabled':''}`} disabled={backDisabled} onClick={this.handleChangeStep.bind(this, -1)}>
                    <span className='icon-left'></span>
                    <span> back</span>
                </button>
                <button className={`guide-button guide-button-right ${nextDisabled?'guide-button-disabled':''}`} disabled={nextDisabled} onClick={this.handleChangeStep.bind(this, 1)}>
                    <span>next </span>
                    <span className='icon-right'></span>
                </button>
              </div>
            </div>
            <div className={`guide-arrow ${this.state.arrowClass}`}></div>
            <div className={this.state.playClass}></div>
          </div>
        </div>,
        this.props.num&&<div className="guide-icon-no" key='guide-icon-no' style={this.state.iconStyle} >{this.state.activeIndex + 1}</div>,
      ]
      return (
        <div className="guide-container" ref='guide'>
          {this.props.children}
          {this.props.visible&&guideNodes}
          {this.props.audio&&<audio ref='audio' src={this.state.audioUrl} type="audio/mpeg"></audio>}
        </div>
      )
  }
}

export default Guide