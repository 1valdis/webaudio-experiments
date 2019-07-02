import React, { Component } from 'react'
import './App.css'

// import FrequencyGraph from './components/FrequencyGraph/FrequencyGraph'
// import SingleChannelLiveFrequencyGraph from './components/SingleChannelLiveFrequencyGraph/SingleChannelLiveFrequencyGraph'
import Player from './components/Player/Player'
// import WorkletWhiteNoise from './components/WorkletWhiteNoise/WhiteNoise'

class App extends Component {
  constructor (...args) {
    super(...args)
    this.audioContext = new AudioContext()
    this.filter = this.audioContext.createBiquadFilter()
    this.state = {
      working: false,
      audioBuffer: null
    }
  }

  render () {
    return <div className='App'>
      {/* <input type="file" id="input" accept="audio/*" onChange={this.openFile}/>
      <button onClick={this.play} disabled={this.state.working || !this.source}>Play</button>
      <FrequencyGraph buffer={this.state.audioBuffer}></FrequencyGraph>
      <WorkletWhiteNoise /> */}
      <Player />
      {/* <input type='file' id='input' accept='audio/*' onChange={e => this.openFile(e)} />
      <input type='range' id='frequency' onChange={(e) => { this.filter.frequency.value = +e.target.value; this.forceUpdate() }} min='0' max='10000' step='1' value={this.filter.frequency.value} />
      <input type='range' id='detune' onChange={(e) => { this.filter.detune.value = +e.target.value; this.forceUpdate() }} min='0' max='10000' step='1' value={this.filter.detune.value} />
      <input type='range' id='gain' onChange={(e) => { this.filter.gain.value = +e.target.value; this.forceUpdate() }} min='-50' max='50' step='0.1' value={this.filter.gain.value} />
      <input type='range' id='Q' onChange={(e) => { this.filter.Q.value = +e.target.value; this.forceUpdate() }} min='0.001' max='10' step='0.001' value={this.filter.Q.value} />
      <select onChange={(e) => { this.filter.type = e.target.value; this.forceUpdate() }} value={this.filter.type}>
        <option>lowpass</option>
        <option>highpass</option>
        <option>bandpass</option>
        <option>lowshelf</option>
        <option>highshelf</option>
        <option>peaking</option>
        <option>notch</option>
        <option>allpass</option>
      </select>
      <SingleChannelLiveFrequencyGraph audioContext={this.audioContext} fromNode={this.filter} /> */}
    </div>
  }

  openFile (e) {
    if (!e.target.files.length) return
    this.setState({ working: true })
    const reader = new window.FileReader()
    reader.onload = async (e) => {
      const buffer = await this.audioContext.decodeAudioData(e.target.result)
      this.source = this.audioContext.createBufferSource()
      this.source.buffer = buffer
      this.source.connect(this.filter)
      this.filter.connect(this.audioContext.destination)
      this.play()
      this.setState({ working: false })
    }
    reader.readAsArrayBuffer(e.target.files[0])
  }

  async play () {
    console.log(this.audioContext.state)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
      console.log('resumed')
    }
    this.source.start(0)
    console.log('started')
  }
}

export default App
