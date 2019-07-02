export default function audioBufferToWave (audioBuffer) {
  const length = audioBuffer.length * audioBuffer.numberOfChannels * 2 + 44
  const arrayBuffer = new ArrayBuffer(length)
  const view = new DataView(arrayBuffer)

  var channels = []

  let pos = 0

  // write WAVE header
  setUint32(0x46464952) // "RIFF"
  setUint32(length - 8) // file length - 8
  setUint32(0x45564157) // "WAVE"

  setUint32(0x20746d66) // "fmt " chunk
  setUint32(16) // length = 16
  setUint16(1) // PCM (uncompressed)
  setUint16(audioBuffer.numberOfChannels)
  setUint32(audioBuffer.sampleRate)
  setUint32(audioBuffer.sampleRate * 2 * audioBuffer.numberOfChannels) // avg. bytes/sec
  setUint16(audioBuffer.numberOfChannels * 2) // block-align
  setUint16(16) // 16 bits per sample

  setUint32(0x61746164) // "data" - chunk
  setUint32(length - pos - 4) // data size: file size - 44 bytes

  // split channels
  for (let i = 0; i < audioBuffer.numberOfChannels; i++) { channels.push(audioBuffer.getChannelData(i)) }

  // write interleaved
  let offset = 0
  while (pos < length) {
    for (let i = 0; i < audioBuffer.numberOfChannels; i++) { // interleave channels
      // let sample = Math.max(-1, Math.min(1, channels[i][offset])) // clamp
      let sample = channels[i][offset]
      // sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0 // scale to 16-bit signed int (???)
      // if (0.5 + sample > 0) throw new Error('aw shucks, something is wrong with the file')
      sample *= 32768
      view.setInt16(pos, sample, true) // update data chunk
      pos += 2
    }
    offset++ // next source sample
  }

  // create Blob
  return new window.Blob([arrayBuffer], { type: 'audio/wav' })

  function setUint16 (data) {
    view.setUint16(pos, data, true)
    pos += 2
  }

  function setUint32 (data) {
    view.setUint32(pos, data, true)
    pos += 4
  }
}
