import React, { PureComponent } from 'react'
import gradient from '../../gradient.json'
import './style.css'

export default class Timeline extends PureComponent {
  constructor (...args) {
    super(...args)
    this.state = {
      secondsPerPixel: 0.02
    }
    this.resize = this.resize.bind(this)
  }
  componentDidMount () {
    if (this.props.audioBuffer) { this.renderCanvas() }
    window.addEventListener('resize', this.resize)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }
  async renderCanvas () {
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

    const suspendTimes = Array.from({ length: this.ctx.canvas.width }, (value, index) => this.state.secondsPerPixel * index)
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
    const canvasWidth = this.ctx.canvas.width
    const canvasHeight = this.ctx.canvas.height
    const imageData = this.ctx.getImageData(0, 0, canvasWidth, canvasHeight)

    const buf = new ArrayBuffer(imageData.data.length)
    const buf8 = new Uint8ClampedArray(buf)
    const data = new Uint32Array(buf)

    for (let y = 0; y < canvasHeight; ++y) {
      for (let x = 0; x < canvasWidth; ++x) {
        const value = frequencySlicesByTime[x][canvasHeight - y - 1]
        data[y * canvasWidth + x] =
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
  resize () {
    if (this.props.audioBuffer) {
      this.forceUpdate()
    }
  }
  render () {
    const offsetPixels = Math.min(
      this.ctx ? Math.max(this.props.currentTime / this.state.secondsPerPixel - this.ctx.canvas.parentElement.clientWidth / 2, 0) : 0,
      this.ctx ? this.props.audioBuffer.duration / this.state.secondsPerPixel - this.ctx.canvas.parentElement.clientWidth : 0
    )
    return <div className='timeline'>
      <div className='frequencygraph'>
        <canvas
          ref={canvas => { this.ctx = canvas && canvas.getContext('2d') }}
          style={{ marginLeft: -offsetPixels }}
        />
        <div className='timelinepointer' style={{ left: this.props.currentTime / this.state.secondsPerPixel - offsetPixels }} />
      </div>
      <input type='range' min='0' max={this.props.audioBuffer ? this.props.audioBuffer.duration.toString() : '0'} step='0.01' value={this.props.currentTime} onInput={this.props.onCurrentTimeChange} />
    </div>
  }
}
