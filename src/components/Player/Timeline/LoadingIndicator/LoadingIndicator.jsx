import React from 'react'

import './style.css'

export default (props) => {
  if (props.hidden) return null
  else if (props.percentage) {
    return <div className='loading'>{`Loading... ${props.percentage}%`}</div>
  } else {
    return <div className='loading'>Loading...</div>
  }
}
