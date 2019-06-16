import React, { PureComponent } from 'react'
import gradient from '../../gradient.json'
import './style.css'

export default class Timeline extends PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      secondsPerPixel: 0.1,
    }
  }
  componentDidMount() {
    if (this.props.audioBuffer)
      this.renderCanvas()
    document.body.addEventListener('resize', () => this.renderCanvas())
  }
  componentDidUpdate() {
    // update current time position
  }
  async renderCanvas() {
    this.ctx.canvas.width = Math.ceil(this.props.audioBuffer ? this.props.audioBuffer.duration / this.state.secondsPerPixel : 0)
    this.ctx.canvas.height = 1024

    const audioCtx = new window.OfflineAudioContext(2, this.props.audioBuffer.length, this.props.audioBuffer.sampleRate)

    const sourceNode = audioCtx.createBufferSource()
    sourceNode.buffer = this.props.audioBuffer
    const analyzerNode = audioCtx.createAnalyser()
    analyzerNode.fftSize = this.ctx.canvas.height * 2
    analyzerNode.smoothingTimeConstant = 0
    sourceNode.connect(analyzerNode)
    analyzerNode.connect(audioCtx.destination)
    sourceNode.start()

    const suspendTimes = Array.from({ length: this.ctx.canvas.width }, (value, index) => this.props.audioBuffer.duration / this.ctx.canvas.width * index)
    const frequencySlicesByTimePromises = suspendTimes
      .map(async time => {
        await audioCtx.suspend(time)
        const frequencyData = new Uint8Array(analyzerNode.frequencyBinCount)
        analyzerNode.getByteFrequencyData(frequencyData)
        await audioCtx.resume()
        return frequencyData
      })
    const rendering = audioCtx.startRendering()
    const frequencySlicesByTime = await Promise.all(frequencySlicesByTimePromises)

    //const canvasWidth = this.ctx.canvas.width
    //const canvasHeight = this.ctx.canvas.height
    const imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    const buf = new ArrayBuffer(imageData.data.length)
    const buf8 = new Uint8ClampedArray(buf)
    const data = new Uint32Array(buf)

    for (let y = 0; y < this.ctx.canvas.height; ++y) {
      for (let x = 0; x < this.ctx.canvas.width; ++x) {
        const value = frequencySlicesByTime[x][this.ctx.canvas.height - y - 1]
        data[y * this.ctx.canvas.width + x] =
                (255 << 24) | // alpha
                (gradient[value][2] << 16) | // blue
                (gradient[value][1] << 8) | // green
                gradient[value][0] // red
      }
    }

    imageData.data.set(buf8)
    this.ctx.putImageData(imageData, 0, 0)
    await rendering
  }
  render () {
    return <div className='timeline'>
      <canvas ref={canvas => this.ctx = canvas && canvas.getContext('2d')}></canvas>
    </div>
  }
}
