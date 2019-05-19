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

      const suspendTimes = Array.from({length: this.canvas.width}, (value, index) => this.props.buffer.duration / this.canvas.width * index)
      const frequencySlicesByTimePromises = suspendTimes
          .map(async (time, x) => {
            await audioCtx.suspend(time)
            const frequencyData = new Uint8Array(analyzerNode.frequencyBinCount);
            analyzerNode.getByteFrequencyData(frequencyData)
            await audioCtx.resume()
            return frequencyData
          })
      const renderingPromise = audioCtx.startRendering()
      const frequencySlicesByTime = await Promise.all(frequencySlicesByTimePromises)
      
      const canvasWidth = this.canvas.width
      const canvasHeight = this.canvas.height
      const imageData = this.ctx.getImageData(0, 0, canvasWidth, canvasHeight)

      const buf = new ArrayBuffer(imageData.data.length)
      const buf8 = new Uint8ClampedArray(buf)
      const data = new Uint32Array(buf)

      for (let y = 0; y < canvasHeight; ++y) {
          for (let x = 0; x < canvasWidth; ++x) {
              const value = frequencySlicesByTime[x][canvasHeight-y-1]
              data[y * canvasWidth + x] =
                  (255   << 24) |    // alpha
                  (gradient[value][2] << 16) |    // blue
                  (gradient[value][1] <<  8) |    // green
                  gradient[value][0];            // red
          }
      }

      imageData.data.set(buf8);
      this.ctx.putImageData(imageData, 0, 0);
      await renderingPromise
    }
  }
  render () {
    return <canvas
      style={{background: 'black', display: 'block'}}
      ref={(ref) => this.canvas = ref}>
    </canvas>
  }
}