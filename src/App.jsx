import React, { Component } from 'react'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import './App.css'

// import FrequencyGraph from './components/FrequencyGraph/FrequencyGraph'
// import SingleChannelLiveFrequencyGraph from './components/SingleChannelLiveFrequencyGraph/SingleChannelLiveFrequencyGraph'
import Player from './components/Player/Player'
import WorkletWhiteNoise from './components/WorkletWhiteNoise/WhiteNoise'
import TracklinesDemo from './components/TracklinesDemo/TracklinesDemo'

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
        <Route exact path='/player-progressive' component={() => <Player progressiveTimeline />} />
        <Route exact path='/whitenoise' component={() => <WorkletWhiteNoise />} />
        <Route exact path='/tracklines' component={() => <TracklinesDemo />} />
      </HashRouter>
    </div>
  }
}

export default App
