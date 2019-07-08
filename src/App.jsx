import React, { Component } from 'react'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import './App.css'

// import FrequencyGraph from './components/FrequencyGraph/FrequencyGraph'
// import SingleChannelLiveFrequencyGraph from './components/SingleChannelLiveFrequencyGraph/SingleChannelLiveFrequencyGraph'
import Player from './components/Player/Player'
// import WorkletWhiteNoise from './components/WorkletWhiteNoise/WhiteNoise'

class App extends Component {
  render () {
    return <div className='App'>
      <HashRouter>
        {/* <ul>
          <li><NavLink to='/player'>Player</NavLink></li>
          <li><NavLink to='/kek'>Kektus</NavLink></li>
        </ul> */}
        <Route exact path='/' component={() => <Redirect to='/player' />} />
        <Route exact path='/player' component={() => <Player />} />
      </HashRouter>
      {/* <input type="file" id="input" accept="audio/*" onChange={this.openFile}/>
      <button onClick={this.play} disabled={this.state.working || !this.source}>Play</button>
      <FrequencyGraph buffer={this.state.audioBuffer}></FrequencyGraph>
      <WorkletWhiteNoise />
      <input type='file' id='input' accept='audio/*' onChange={e => this.openFile(e)} />
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
}

export default App
