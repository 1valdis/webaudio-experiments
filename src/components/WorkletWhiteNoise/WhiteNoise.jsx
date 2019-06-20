import React, { PureComponent } from 'react'

class WhiteNoizeWorkletNode extends window.AudioWorkletNode {
  constructor (context) {
    super(context, 'white-noise-processor')
  }
}

export default class WhiteNoize extends PureComponent {
  constructor (...args) {
    super(...args)
    this.state = {
      initializing: true
    }
    this.init()
  }
  async init () {
    this.audioContext = new window.AudioContext()
    await this.audioContext.audioWorklet.addModule('white-noise-processor.js')
    this.whiteNoizeNode = new WhiteNoizeWorkletNode(this.audioContext)
    this.whiteNoizeNode.connect(this.audioContext.destination)
    this.setState({
      initializing: false
    })
  }
  render () {
    return <button onClick={() => this.audioContext.resume()} disabled={!this.state.initializing}>play</button>
  }
}
