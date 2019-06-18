import React, { Component } from 'react'
import './App.css'

// import FrequencyGraph from './components/FrequencyGraph/FrequencyGraph'
// import LiveFrequencyGraph from './components/LiveFrequencyGraph/LiveFrequencyGraph'
import Player from './components/Player/Player'

class App extends Component {
  render () {
    return <div className='App'>
      {/* <input type="file" id="input" accept="audio/*" onChange={this.openFile}/>
      <button onClick={this.play} disabled={this.state.working || !this.source}>Play</button>
      <FrequencyGraph buffer={this.state.audioBuffer}></FrequencyGraph> */}
      <Player />
      {/* <LiveFrequencyGraph audioContext={this.audioContext} fromNode={this.source}></LiveFrequencyGraph> */}
    </div>
  }
}

export default App
