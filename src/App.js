import React, { Component } from 'react';
import './App.css';

import FrequencyGraph from './components/FrequencyGraph'
import LiveFrequencyGraph from './components/LiveFrequencyGraph'

class App extends Component {
  constructor(...args){
    super(...args)
    this.audioContext = new AudioContext()
    this.state = {
      working: false,
      audioBuffer: null,
    }
  }

  render = () => (
    <div className="App">
      <input type="file" id="input" accept="audio/*" onChange={this.openFile}/>
      <button onClick={this.play} disabled={this.state.working || !this.source}>Play</button>
      {/*<FrequencyGraph buffer={this.state.audioBuffer}></FrequencyGraph>*/}
      <LiveFrequencyGraph audioContext={this.audioContext} fromNode={this.source}></LiveFrequencyGraph>
    </div>
  );

  openFile = (e) => {
    this.setState({working: true})
    const reader = new FileReader()
    reader.onload = async (e) => {
      const buffer = await this.audioContext.decodeAudioData(e.target.result)
      this.source = this.audioContext.createBufferSource()
      this.source.buffer = buffer
      this.source.connect(this.audioContext.destination)
      this.setState({working: false, audioBuffer: buffer })
    }
    reader.readAsArrayBuffer(e.target.files[0])
  }

  play = async () => {
    console.log(this.audioContext.state)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
      console.log('resumed')
    }
    this.source.start(0)
    console.log('started')
  }
}

export default App;
