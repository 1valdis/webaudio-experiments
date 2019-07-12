import React, { PureComponent } from 'react'

import AudioOpener from '../AudioOpener/AudioOpener'

export default class TracklinesDemo extends PureComponent {
  constructor (...args) {
    super(...args)
    this.audioContext = new window.AudioContext()
  }
  render () {
    return <>
      <AudioOpener audioContext={this.audioContext} />
    </>
  }
}
