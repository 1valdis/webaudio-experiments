import React, { Component } from 'react'
import './App.css'

import FrequencyGraph from './components/FrequencyGraph/FrequencyGraph'
import LiveFrequencyGraph from './components/LiveFrequencyGraph/LiveFrequencyGraph'
import Player from './components/Player/Player'

class App extends Component {
  constructor (...args) {
    super(...args)
    this.audioContext = new AudioContext()
    this.state = {
      working: false,
      audioBuffer: null
    }
  }

  render () {
    return <div className='App'>
      {/* <input type="file" id="input" accept="audio/*" onChange={this.openFile}/>
      <button onClick={this.play} disabled={this.state.working || !this.source}>Play</button>
      <FrequencyGraph buffer={this.state.audioBuffer}></FrequencyGraph> */}
      <Player />
      {/* <LiveFrequencyGraph audioContext={this.audioContext} fromNode={this.source}></LiveFrequencyGraph> */}
    </div>
  };

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
