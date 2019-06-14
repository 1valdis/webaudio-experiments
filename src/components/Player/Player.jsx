import React, { PureComponent } from 'react'
import Timeline from './Timeline/Timeline'
import PlayPause from './PlayPause/PlayPause'
import AudioOpener from './AudioOpener/AudioOpener'

import './style.css'

export default class Player extends PureComponent {
  constructor (...args) {
    super(...args)
    this.state = {
      audioBuffer: null,
      currentTime: 0, // time in playing file (in seconds)
      startTime: 0, // time of file start in audioContext's reference system
      isPlaying: false
    }
    this.audioContext = new window.AudioContext()
    this.sourceNode = null
  }
  render () {
    return <div className='player'>
      <Timeline audioBuffer={this.state.audioBuffer} currentTime={this.state.currentTime} onCurrentTimeChange={this.setTime} />
      <PlayPause isPlaying={this.state.isPlaying} onChange={this.state.isPlaying ? () => this.pause() : () => this.play()} disabled={!this.state.audioBuffer} />
      <AudioOpener audioContext={this.audioContext} onOpen={(buffer) => { this.fileOpened(buffer); this.play() }} />
    </div>
  }
  fileOpened (buffer) {
    this.setState(() => ({
      audioBuffer: buffer,
      currentTime: 0,
      startTime: this.audioContext.currentTime
    }), () => {
      if (this.state.isPlaying) {
        this.play()
      }
    })
  }
  async play (time = this.state.currentTime) {
    if (!this.state.audioBuffer) return
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }
    if (this.sourceNode) {
      this.sourceNode.disconnect()
      this.sourceNode.stop()
    }
    this.sourceNode = this.audioContext.createBufferSource()
    this.sourceNode.connect(this.audioContext.destination)
    this.sourceNode.buffer = this.state.audioBuffer
    this.sourceNode.start(0, time)
    this.setState({
      isPlaying: true,
      startTime: this.audioContext.currentTime - time
    })
  }
  async pause () {
    this.sourceNode.disconnect()
    this.sourceNode.stop()
    this.sourceNode = null
    this.setState(state => ({
      isPlaying: false,
      currentTime: this.audioContext.currentTime - state.startTime
    }))
  }
}
