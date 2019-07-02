import React, { PureComponent } from 'react'
import gradient from '../gradient.json'

export default class FrequencyGraph extends PureComponent {
  constructor (...args) {
    super(...args)
    this.state = {
      working: true
    }
  }
  async componentDidMount () {
    this.canvas.width = document.body.clientWidth
    this.canvas.height = 512
    this.ctx = this.canvas.getContext('2d')
    this.analyzerNode = this.props.audioContext.createAnalyser()
    this.analyzerNode.fftSize = this.canvas.height * 2
    this.analyzerNode.smoothingTimeConstant = 0
    this.props.fromNode.connect(this.analyzerNode)
    this.animate()
    this.setState({ animating: true })
  }
  animate () {
    window.requestAnimationFrame(this.animate.bind(this))
    const frequencyData = new Uint8Array(this.analyzerNode.frequencyBinCount)
    this.analyzerNode.getByteFrequencyData(frequencyData)
    const canvasWidth = this.canvas.width
    const canvasHeight = this.canvas.height
    const imageData = this.ctx.getImageData(canvasWidth / 2 - 1, 0, 1, canvasHeight)

    const buf = new ArrayBuffer(imageData.data.length)
    const buf8 = new Uint8ClampedArray(buf)
    const data = new Uint32Array(buf)
    for (let y = 0; y < canvasHeight; y++) {
      const value = frequencyData[y]
      data[canvasHeight - y] =
          (255 << 24) | // alpha
          (gradient[value][2] << 16) | // blue
          (gradient[value][1] << 8) | // green
          gradient[value][0] // red
    }
    imageData.data.set(buf8)
    this.ctx.drawImage(this.ctx.canvas, -1, 0)
    this.ctx.putImageData(imageData, this.canvas.width / 2 - 1, 0)
  }
  render () {
    return <canvas
      style={{ background: 'black', display: 'block' }}
      ref={(ref) => { this.canvas = ref }} />
  }
}
