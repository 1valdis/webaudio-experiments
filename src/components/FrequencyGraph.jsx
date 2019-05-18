import React, { PureComponent } from 'react'
import gradient from './gradient.json'

export default class FrequencyGraph extends PureComponent {
  constructor (...args) {
    super(...args)
    this.state = {
      working: true,
    }
  }
  async componentDidMount () {
    this.canvas.width = 1000;
    this.canvas.height = 512;
    this.ctx = this.canvas.getContext('2d');
  }
  async componentDidUpdate () {
    if (this.props.buffer) {
      const audioCtx = new OfflineAudioContext(2, this.props.buffer.length, this.props.buffer.sampleRate)

      const sourceNode = audioCtx.createBufferSource()
      sourceNode.buffer = this.props.buffer
      const analyzerNode = audioCtx.createAnalyser()
      analyzerNode.fftSize = this.canvas.height*2;
      analyzerNode.smoothingTimeConstant = 0;
      sourceNode.connect(analyzerNode)
      analyzerNode.connect(audioCtx.destination)
      sourceNode.start()

      const suspendTimes = Array.from({length: Math.ceil(this.canvas.width)}, (value, index) => this.props.buffer.duration / this.canvas.width * index)
      const renderingPromise = audioCtx.startRendering()
      await Promise.all(
        suspendTimes
          .map((time, x) => audioCtx
            .suspend(time)
            .then(() => {
              const frequencyData = new Uint8Array(analyzerNode.frequencyBinCount);
              analyzerNode.getByteFrequencyData(frequencyData)
              console.log(audioCtx.currentTime)
              frequencyData.map((value, y) => {
                this.ctx.fillStyle = `rgb(${gradient[value]})`
                this.ctx.fillRect(x, this.canvas.height-y, 1, 1)
              })
            })
            .then(() => audioCtx.resume())
          )
      )
    }
  }
  render () {
    return <canvas
      style={{background: 'black', display: 'block'}}
      ref={(ref) => this.canvas = ref}>
    </canvas>
  }
}