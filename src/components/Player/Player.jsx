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
      isPlaying: false
    }
    this.audioContext = new window.AudioContext()
    this.sourceNode = null
  }
  render () {
    return <div className='player'>
      <Timeline audioBuffer={this.state.audioBuffer} currentTime={this.state.currentTime} onCurrentTimeChange={this.setTime} />
      <PlayPause isPlaying={this.state.isPlaying} onChange={this.state.isPlaying ? () => this.pause() : () => this.play()} />
      <AudioOpener audioContext={this.audioContext} onOpen={(buffer) => this.setAudioBuffer(buffer)} />
    </div>
  }
  setAudioBuffer (buffer) {
    if (this.sourceNode) {
      this.sourceNode.stop()
      this.sourceNode.disconnect()
    }
    this.sourceNode = this.audioContext.createBufferSource()
    this.sourceNode.connect(this.audioContext.destination)
    this.sourceNode.buffer = buffer
    this.setState({
      audioBuffer: buffer
    })
    this.play()
  }
  async play (time = 0) {
    if (!this.state.audioBuffer) return
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
      this.setState({
        isPlaying: true
      })
      return
    }
    this.sourceNode.start(0, this.audioContext.currentTime + time)
    this.setState({
      isPlaying: true
    })
  }
  async pause () {
    if (this.audioContext.state === 'running') {
      await this.audioContext.suspend()
    }
    this.setState({
      isPlaying: false
    })
  }
}
