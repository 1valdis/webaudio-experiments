import React, { PureComponent } from 'react'

export default class WhiteNoize extends PureComponent {
  constructor (...args) {
    super(...args)
    this.state = {
      initializing: true
    }
  }
  componentDidMount () {
    this.init()
  }
  async init () {
    this.audioContext = new window.AudioContext()
    await this.audioContext.audioWorklet.addModule('white-noise-processor.js')
    this.whiteNoiseNode = new window.AudioWorkletNode(this.audioContext, 'white-noise-processor')
    this.whiteNoiseNode.connect(this.audioContext.destination)
    this.setState({
      initializing: false
    })
    console.log(this.whiteNoiseNode.parameters)
  }
  render () {
    return <div>
      <button onClick={() => this.audioContext.resume()} disabled={!this.state.initializing}>play</button>
      <input type='range' onChange={(e) => this.whiteNoiseNode.parameters.get('customGain').linearRampToValueAtTime(+e.target.value, this.audioContext.currentTime + 0.5)} min='0' max='1' step='0.01' />
    </div>
  }
}
