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
      audioBufferKey: 0,
      currentTime: 0, // time in playing file (in seconds)
      startTime: 0, // time of file start in audioContext's reference system
      isPlaying: false
    }
    this.audioContext = new window.AudioContext()
    this.sourceNode = null
  }
  render () {
    return <div className='player'>
      <Timeline audioBuffer={this.state.audioBuffer} currentTime={this.state.currentTime} onCurrentTimeChange={(e) => this.play(+e.target.value)} key={this.state.audioBufferKey}/>
      <PlayPause isPlaying={this.state.isPlaying} onChange={this.state.isPlaying ? () => this.pause() : () => this.play()} disabled={!this.state.audioBuffer} />
      <AudioOpener audioContext={this.audioContext} onOpen={(buffer) => { this.fileOpened(buffer); this.play() }} />
    </div>
  }
  fileOpened (buffer) {
    this.setState((state) => ({
      audioBuffer: buffer,
      audioBufferKey: state.audioBufferKey + 1,
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
    if (!this.state.isPlaying) {
      requestAnimationFrame(() => this.updateCurrentTime())
    }
    this.setState({
      isPlaying: true,
      startTime: this.audioContext.currentTime - time
    })
  }
  updateCurrentTime() {
    this.setState(state => {
      if (this.state.isPlaying) {
        return {
          currentTime: this.audioContext.currentTime - state.startTime
        }
      }
      return {}
    }, () => this.state.isPlaying && requestAnimationFrame(() => this.updateCurrentTime()))
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
