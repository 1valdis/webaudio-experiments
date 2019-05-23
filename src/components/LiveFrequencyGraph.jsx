import React, { PureComponent } from 'react'
import gradient from './gradient.json'

export default class FrequencyGraph extends PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      working: true,
    }
  }
  async componentDidMount() {
    this.canvas.width = Math.round(document.body.clientWidth/2)*2;
    this.canvas.height = 512;
    this.ctx = this.canvas.getContext('2d');
  }
  async componentDidUpdate() {
    if (this.props.fromNode && this.props.audioContext && !this.state.animating) {
      this.splitterNode = this.props.audioContext.createChannelSplitter(2)
      this.analyzerNodeLeft = this.props.audioContext.createAnalyser()
      this.analyzerNodeRight = this.props.audioContext.createAnalyser()
      this.analyzerNodeLeft.fftSize = this.canvas.height * 2
      this.analyzerNodeLeft.smoothingTimeConstant = 0
      this.analyzerNodeRight.fftSize = this.canvas.height * 2
      this.analyzerNodeRight.smoothingTimeConstant = 0
      this.props.fromNode.connect(this.splitterNode)
      this.splitterNode.connect(this.analyzerNodeLeft, 0)
      this.splitterNode.connect(this.analyzerNodeRight, 0)
      this.animate()
      debugger
      this.setState({animating: true})
    }
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this))
    const frequencyDataLeft = new Uint8Array(this.analyzerNodeLeft.frequencyBinCount);
    this.analyzerNodeLeft.getByteFrequencyData(frequencyDataLeft)
    const frequencyDataRight = new Uint8Array(this.analyzerNodeRight.frequencyBinCount);
    this.analyzerNodeRight.getByteFrequencyData(frequencyDataRight)
    const canvasWidth = this.canvas.width
    const canvasHeight = this.canvas.height
    const imageDataLeft = this.ctx.getImageData(canvasWidth/2-1, 0, 1, canvasHeight)
    const imageDataRight = this.ctx.getImageData(canvasWidth/2, 0, 1, canvasHeight)

    const bufLeft = new ArrayBuffer(imageDataLeft.data.length)
    const buf8Left = new Uint8ClampedArray(bufLeft)
    const dataLeft = new Uint32Array(bufLeft)

    for (let y = 0; y < canvasHeight; y++) {
      const value = frequencyDataLeft[y]
        dataLeft[canvasHeight - y] =
        (255 << 24) |    // alpha
        (gradient[value][2] << 16) |    // blue
        (gradient[value][1] << 8) |    // green
        gradient[value][0];            // red
    }

    const bufRight = new ArrayBuffer(imageDataRight.data.length)
    const buf8Right = new Uint8ClampedArray(bufRight)
    const dataRight = new Uint32Array(bufRight)

    for (let y = 0; y < canvasHeight; y++) {
      const value = frequencyDataRight[y]
        dataRight[canvasHeight - y] =
          (255 << 24) |    // alpha
          (gradient[value][2] << 16) |    // blue
          (gradient[value][1] << 8) |    // green
          gradient[value][0];            // red
    }

    imageDataLeft.data.set(buf8Left)
    imageDataRight.data.set(buf8Right)

    this.ctx.drawImage(this.ctx.canvas, 0, 0, this.canvas.width/2, this.canvas.height, -1, 0, this.canvas.width/2, this.canvas.height)
    this.ctx.drawImage(this.ctx.canvas, this.canvas.width/2, 0, this.canvas.width/2, this.canvas.height, this.canvas.width/2+1, 0, this.canvas.width/2, this.canvas.height)
    this.ctx.putImageData(imageDataLeft, this.canvas.width/2-1, 0)
    this.ctx.putImageData(imageDataRight, this.canvas.width/2, 0)
    //this.ctx.putImageData(imageDataRight, this.canvas.width/2+2, 0)
    //this.ctx.putImageData(imageDataRight, this.canvas.width/2+3, 0)
  }
  render() {
    return <canvas
      style={{ background: 'black', display: 'block' }}
      ref={(ref) => this.canvas = ref}>
    </canvas>
  }
}