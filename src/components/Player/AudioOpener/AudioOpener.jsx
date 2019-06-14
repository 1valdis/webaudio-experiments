import React, { PureComponent } from 'react'
import './style.css'

export default class Timeline extends PureComponent {
  constructor (...args) {
    super(...args)
    this.state = {
      isWorking: false
    }
  }
  render () {
    return <div className='audioopener'>
      <input type='file' id='input' accept='audio/*' onChange={(e) => this.openFile(e)} disabled={this.state.isWorking} />
    </div>
  }
  openFile (e) {
    this.setState({ isWorking: true })
    const reader = new window.FileReader()
    reader.onload = async (e) => {
      const buffer = await this.props.audioContext.decodeAudioData(e.target.result)
      this.setState({ isWorking: false })
      this.props.onOpen(buffer)
    }
    reader.readAsArrayBuffer(e.target.files[0])
  }
}
