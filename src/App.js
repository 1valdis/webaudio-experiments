import React, { PureComponent } from 'react';
import './App.css';

class App extends PureComponent {
  componentDidMount = () => {
    this.context = new AudioContext();
  }

  render = () => (
    <div className="App">
      <input type="file" id="input" onChange={this.openFile}/>
      <button onClick={this.play}>Проиграй это</button>
    </div>
  );

  openFile = (e) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      this.source = this.context.createBufferSource()
      this.source.buffer = await this.context.decodeAudioData(e.target.result)
      this.source.connect(this.context.destination)
      console.log('done')
    }
    reader.readAsArrayBuffer(e.target.files[0])
  }

  play = async () => {
    console.log(this.context.state)
    if (this.context.state === 'suspended') {
      await this.context.resume()
    }
    this.source.start(0)
    console.log('done')
  }
}

export default App;
