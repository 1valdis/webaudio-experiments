import React, { PureComponent } from 'react'
import IntegerRange from 'multi-integer-range'
import './style.css'

export default class Timeline extends PureComponent {
  constructor (...args) {
    super(...args)
    this.state = {
      secondsPerPixel: 0.02
    }
    // this.resize = this.resize.bind(this)

    const workerCode = `
      const gradient = [ [0,0,0], [0,0,1], [0,0,3], [0,0,4], [0,0,6], [0,0,7], [0,0,9], [0,0,10], [0,0,12], [0,0,13], [0,0,15], [0,0,16], [0,0,18], [0,0,19], [0,0,21], [0,0,22], [0,0,24], [0,0,25], [0,0,26], [0,0,28], [0,0,29], [0,0,31], [0,0,32], [0,0,34], [0,0,35], [0,0,37], [0,0,38], [0,0,40], [0,0,41], [0,0,43], [0,0,44], [0,0,46], [0,0,47], [0,0,49], [0,0,50], [0,0,51], [0,0,53], [0,0,54], [0,0,56], [0,0,57], [0,0,59], [0,0,60], [0,0,62], [0,0,63], [0,0,65], [0,0,66], [0,0,68], [0,0,69], [0,0,71], [0,0,72], [0,0,74], [0,0,75], [0,0,76], [0,0,78], [0,0,79], [0,0,81], [0,0,82], [0,0,84], [0,0,85], [0,0,87], [0,0,88], [0,0,90], [0,0,91], [0,0,93], [0,0,94], [0,0,96], [0,0,97], [0,0,99], [0,0,100], [2,0,101], [4,0,101], [6,0,102], [8,0,102], [10,0,103], [11,0,103], [13,0,104], [15,0,104], [17,0,105], [19,0,105], [21,0,106], [23,0,106], [25,0,107], [27,0,107], [29,0,108], [30,0,108], [32,0,109], [34,0,110], [36,0,110], [38,0,111], [40,0,111], [42,0,112], [44,0,112], [46,0,113], [48,0,113], [49,0,114], [51,0,114], [53,0,115], [57,0,116], [59,0,116], [61,0,117], [63,0,118], [65,0,118], [67,0,119], [68,0,119], [70,0,120], [72,0,120], [74,0,121], [76,0,121], [78,0,122], [80,0,122], [82,0,123], [84,0,123], [86,0,124], [87,0,124], [89,0,125], [91,0,125], [93,0,126], [95,0,127], [97,0,127], [99,0,128], [101,0,128], [103,0,129], [105,0,129], [106,0,130], [108,0,130], [110,0,131], [112,0,131], [114,0,132], [116,0,132], [118,0,133], [120,0,133], [122,0,134], [124,0,135], [125,0,135], [127,0,136], [129,0,136], [131,0,137], [133,0,137], [135,0,138], [137,0,138], [139,0,139], [141,0,139], [143,0,140], [144,0,140], [146,0,141], [148,0,141], [150,0,142], [152,0,142], [154,0,143], [156,4,142], [158,8,142], [160,11,141], [162,15,141], [165,19,140], [165,19,140], [167,23,140], [169,27,139], [171,31,139], [173,34,138], [175,38,137], [177,42,137], [179,46,136], [181,50,136], [183,53,135], [186,57,135], [188,61,134], [190,65,133], [192,69,133], [194,72,132], [194,72,132], [196,76,132], [198,80,131], [200,84,131], [202,88,130], [205,92,130], [207,95,129], [209,99,128], [211,103,128], [213,107,127], [215,111,127], [217,114,126], [219,118,126], [219,118,126], [221,122,125], [223,126,124], [226,130,124], [228,133,123], [230,137,123], [232,141,122], [234,145,122], [236,149,121], [236,149,121], [238,153,121], [240,156,120], [242,160,119], [244,164,119], [247,168,118], [249,172,118], [251,175,117], [253,179,117], [255,183,116], [255,184,119], [255,186,121], [255,187,124], [255,188,126], [255,190,129], [255,191,131], [255,192,134], [255,193,136], [255,195,139], [255,196,141], [255,197,144], [255,199,146], [255,200,149], [255,201,151], [255,203,154], [255,204,156], [255,205,159], [255,207,161], [255,208,164], [255,209,167], [255,210,169], [255,212,172], [255,213,174], [255,214,177], [255,216,179], [255,217,182], [255,218,184], [255,220,187], [255,221,189], [255,222,192], [255,224,194], [255,225,197], [255,226,199], [255,228,202], [255,229,204], [255,230,207], [255,231,210], [255,233,212], [255,234,215], [255,235,217], [255,237,220], [255,238,222], [255,239,225], [255,241,227], [255,242,230], [255,243,232], [255,245,235], [255,246,237], [255,247,240], [255,248,242], [255,250,245], [255,251,247], [255,252,250], [255,254,252], [255,255,255]]
      let ctx = null
      let slices = []
      let lastCurrentTime = 0
      let secondsPerPixel = null
      const renderCanvas = () => {
        const width = ctx.canvas.width
        const height = ctx.canvas.height
        const imageData = ctx.getImageData(0, 0, width, height)
        ctx.fillStyle='black'
        ctx.fillRect(0, 0, width, height)

        const data = new Uint32Array(imageData.data.buffer)

        const offsetPixels = Math.min(
          Math.max(lastCurrentTime / secondsPerPixel - width / 2, 0),
          slices.length - width
        )

        // if (offsetPixels > 20) debugger
        for (let x = 0, offsetInteger = ~~offsetPixels; x < width; ++x) {
          if (!slices[x + offsetInteger]) continue
          for (let y = 0; y < height; ++y) {
            const value = slices[x + offsetInteger][height - y - 1]
            data[y * width + x] =
                    (255 << 24) | // alpha
                    (gradient[value][2] << 16) | // blue
                    (gradient[value][1] << 8) | // green
                    gradient[value][0] // red
          }
        }
        ctx.putImageData(imageData, 0, 0)
        //console.log("worker time", lastCurrentTime)
      }
      onmessage = e => {
        if (e.data.canvas) {
          ctx = e.data.canvas.getContext("2d")
          secondsPerPixel = e.data.secondsPerPixel
          slices = new Array(e.data.totalWidth)
        }
        if (e.data.slices) {
          slices.splice(e.data.start, e.data.end-e.data.start+1, ...e.data.slices.map(buffer => new Uint8ClampedArray(buffer)))
          renderCanvas()
        }
        if (e.data.currentTime) {
          lastCurrentTime = e.data.currentTime
          renderCanvas()
        }
      }
    `
    const blob = new window.Blob([workerCode], { type: 'text/javascript' })
    this.workerUrl = URL.createObjectURL(blob)
    this.worker = new window.Worker(this.workerUrl)
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
    URL.revokeObjectURL(this.workerUrl)
  }
  async renderFrequencyDataAroundCurrentTime () {
    if (!this.props.audioBuffer) return

    if (this.currentlyRendering) return

    if (!this.frequencySlicesByTime) {
      this.notRenderedSlices = new IntegerRange([[0, Math.ceil(this.props.audioBuffer.duration / this.state.secondsPerPixel)]])
      this.frequencySlicesByTime = new Array(Math.ceil(this.props.audioBuffer.duration / this.state.secondsPerPixel))
    }
    this.currentlyRendering = true

    const startPixel = Math.max(
      0,
      Math.round(this.props.currentTime / this.state.secondsPerPixel - this.canvas.width)
    )
    const endPixel = Math.min(
      Math.ceil(this.props.audioBuffer.duration / this.state.secondsPerPixel) - 1,
      Math.round(this.props.currentTime / this.state.secondsPerPixel + this.canvas.width)
    )

    const rangeToRender = new IntegerRange([[startPixel, endPixel]])
      .intersect(this.notRenderedSlices)
    this.notRenderedSlices.subtract(rangeToRender)

    if (!rangeToRender.length()) return
    const audioCtx = new window.OfflineAudioContext(this.props.audioBuffer.numberOfChannels, ~~((rangeToRender.max() - rangeToRender.min() + 1) * this.state.secondsPerPixel * this.props.audioBuffer.sampleRate), this.props.audioBuffer.sampleRate)

    const sourceNode = audioCtx.createBufferSource()
    sourceNode.buffer = this.props.audioBuffer
    const analyzerNode = audioCtx.createAnalyser()
    analyzerNode.fftSize = 2048
    analyzerNode.smoothingTimeConstant = 0
    sourceNode.connect(analyzerNode)
    analyzerNode.connect(audioCtx.destination)
    sourceNode.start(0, rangeToRender.min() * this.state.secondsPerPixel)

    const promises = []
    for (const index of rangeToRender.clone().subtract(rangeToRender.max())) {
      const time = (index - rangeToRender.min() + 1) * this.state.secondsPerPixel
      promises.push((async () => {
        const slice = await this.getFrequencyDataAtTime(audioCtx, analyzerNode, time)
        this.frequencySlicesByTime[index] = slice
      })())
    }
    await audioCtx.startRendering()
    this.frequencySlicesByTime[rangeToRender.max()] = await this.getFrequencyDataAtTime(audioCtx, analyzerNode)

    await Promise.all(
      promises
    )

    this.currentlyRendering = false
    const slicesForWorker = this.frequencySlicesByTime.slice(rangeToRender.min(), rangeToRender.max() + 1).map(array => array.buffer)
    console.log('Main time', this.props.currentTime)
    this.worker.postMessage({ slices: slicesForWorker, start: rangeToRender.min(), end: rangeToRender.max() }, slicesForWorker)
  }
  async getFrequencyDataAtTime (audioCtx, analyzerNode, time) {
    if (time) {
      await audioCtx.suspend(time)
    }
    const frequencyData = new Uint8Array(analyzerNode.frequencyBinCount)
    analyzerNode.getByteFrequencyData(frequencyData)
    if (time) {
      await audioCtx.resume()
    }
    return frequencyData
  }
  async renderCanvas () {
    const width = Math.ceil(this.props.audioBuffer ? this.props.audioBuffer.duration / this.state.secondsPerPixel : 0)
    const height = 1024
    const audioCtx = new window.OfflineAudioContext(2, this.props.audioBuffer.length, this.props.audioBuffer.sampleRate)

    const sourceNode = audioCtx.createBufferSource()
    sourceNode.buffer = this.props.audioBuffer
    const analyzerNode = audioCtx.createAnalyser()
    analyzerNode.fftSize = height * 2
    analyzerNode.smoothingTimeConstant = 0
    sourceNode.connect(analyzerNode)
    analyzerNode.connect(audioCtx.destination)
    sourceNode.start()

    const suspendTimes = Array.from({ length: width }, (value, index) => this.state.secondsPerPixel * index + 1)
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
    const frequencySlicesByTimeBuffers = frequencySlicesByTime.map(array => array.buffer)
    this.worker.postMessage(frequencySlicesByTimeBuffers, frequencySlicesByTimeBuffers)
    console.log('message posted')
    await rendering
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
