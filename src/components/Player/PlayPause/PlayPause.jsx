import React, { PureComponent } from 'react'
import './style.css'

export default class Timeline extends PureComponent {
  render () {
    return <div className='playpause'>
      <button onClick={this.props.onChange} disabled={this.props.disabled}>{this.props.isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  }
}
