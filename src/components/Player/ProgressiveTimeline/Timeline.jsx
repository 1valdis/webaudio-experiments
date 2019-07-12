import React, { PureComponent } from 'react'
import IntegerRange from 'multi-integer-range'
import './style.css'
import throttle from 'lodash.throttle'

export default class Timeline extends PureComponent {
  constructor (...args) {
    super(...args)
    this.state = {
      secondsPerPixel: 0.02
    }
    // this.resize = this.resize.bind(this)
    this.worker = new window.Worker('timeline-renderer-worker.js')
    this.renderFrequencyDataAroundCurrentTime = throttle(this.renderFrequencyDataAroundCurrentTime, 300)
  }
  componentDidMount () {
    // window.addEventListener('resize', this.resize)

    this.canvas.width = this.graphContainer.clientWidth
    const offscreen = this.canvas.transferControlToOffscreen()
    this.worker.postMessage({ canvas: offscreen, secondsPerPixel: this.state.secondsPerPixel, totalWidth: this.props.audioBuffer ? Math.ceil(this.props.audioBuffer.duration / this.state.secondsPerPixel) : 0 }, [offscreen])
    this.renderFrequencyDataAroundCurrentTime()
  }
  componentDidUpdate () {
    this.worker.postMessage({ currentTime: this.props.currentTime })
    this.renderFrequencyDataAroundCurrentTime()
  }
  componentWillUnmount () {
    // window.removeEventListener('resize', this.resize)
    this.worker.terminate()
  }
  async renderFrequencyDataAroundCurrentTime () {
    if (!this.props.audioBuffer) return

    if (this.currentlyRendering) return

    if (!this.graphContainer) return

    if (!this.frequencySlicesByTime) {
      this.notRenderedSlices = new IntegerRange([[0, Math.ceil(this.props.audioBuffer.duration / this.state.secondsPerPixel)]])
      this.frequencySlicesByTime = new Array(Math.ceil(this.props.audioBuffer.duration / this.state.secondsPerPixel))
    }

    const startPixel = Math.max(
      0,
      Math.round(this.props.currentTime / this.state.secondsPerPixel - this.graphContainer.clientWidth)
    )
    const endPixel = Math.min(
      Math.ceil(this.props.audioBuffer.duration / this.state.secondsPerPixel) - 1,
      Math.round(this.props.currentTime / this.state.secondsPerPixel + this.graphContainer.clientWidth)
    )

    const rangeToRender = new IntegerRange([[startPixel, endPixel]])
      .intersect(this.notRenderedSlices)
    this.notRenderedSlices.subtract(rangeToRender)

    if (!rangeToRender.length()) return
    this.currentlyRendering = true
    const audioCtx = new window.OfflineAudioContext(this.props.audioBuffer.numberOfChannels, ~~((rangeToRender.max() - rangeToRender.min() + 2) * this.state.secondsPerPixel * this.props.audioBuffer.sampleRate), this.props.audioBuffer.sampleRate)

    const sourceNode = audioCtx.createBufferSource()
    sourceNode.buffer = this.props.audioBuffer
    const analyzerNode = audioCtx.createAnalyser()
    analyzerNode.fftSize = 2048
    analyzerNode.smoothingTimeConstant = 0
    sourceNode.connect(analyzerNode)
    analyzerNode.connect(audioCtx.destination)
    sourceNode.start(0, rangeToRender.min() * this.state.secondsPerPixel)

    const promises = []
    // todo we should have at least 2*fftSize samples of data before analyze
    for (const index of rangeToRender) {
      const time = (index - rangeToRender.min() + 1) * this.state.secondsPerPixel
      promises.push((async () => {
        const slice = await this.getFrequencyDataAtTime(audioCtx, analyzerNode, time)
        this.frequencySlicesByTime[index] = slice
      })())
    }
    await audioCtx.startRendering()
    await Promise.all(
      promises
    )

    this.currentlyRendering = false
    const slicesForWorker = this.frequencySlicesByTime.slice(rangeToRender.min(), rangeToRender.max() + 1).map(array => array.buffer)
    this.worker.postMessage({ slices: slicesForWorker, start: rangeToRender.min(), end: rangeToRender.max() }, slicesForWorker)
  }
  async getFrequencyDataAtTime (audioCtx, analyzerNode, time) {
    await audioCtx.suspend(time)
    const frequencyData = new Uint8Array(analyzerNode.frequencyBinCount)
    analyzerNode.getByteFrequencyData(frequencyData)
    await audioCtx.resume()
    return frequencyData
  }
  render () {
    const offsetPixels = this.props.audioBuffer && this.canvas ? Math.min(
      Math.max(this.props.currentTime / this.state.secondsPerPixel - this.canvas.width / 2, 0),
      this.props.audioBuffer.duration / this.state.secondsPerPixel - this.canvas.width
    ) : 0
    return <div className='timeline'>
      <div className='frequencygraph' ref={el => { this.graphContainer = el }}>
        <canvas
          ref={(canvas) => { this.canvas = canvas }}
          width={this.state.graphWidth}
          height={1024}
        />
        <div className='timelinepointer' style={{ left: this.props.currentTime / this.state.secondsPerPixel - offsetPixels }} />
      </div>
      <input type='range' min='0' max={this.props.audioBuffer ? this.props.audioBuffer.duration.toString() : '0'} step='0.01' value={this.props.currentTime} onInput={this.props.onCurrentTimeChange} onChange={() => {}} />
    </div>
  }
}
