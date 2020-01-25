import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';

const Timer = (props) => {
  const [counter , setCounter] = useState(0);

    useEffect(() => {
      setTimeout(()=>{
        setCounter(counter+1)
      },500)
    }, [counter])

  return (
      <div style={{
      height: '200px',
      width: '200px',
      flex: '0 0 auto',
      display: 'inline-block',
      boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.2)',
      borderRadius: '2px',
      padding: '8px 12px',
      backgroundColor: 'rgba(147,204,255,0.05)',
      margin: '4px',
      position: 'relative',
    }}>
      <h1>{counter}</h1>
    </div>
  )
}

Timer.propTypes = {}
Timer.defaultProps = {}

export default Timer