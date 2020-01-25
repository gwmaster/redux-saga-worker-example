import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ExampleWorkerActions } from './ExampleWorker.action'
import Slider from '../Animations/Slider'
import './style.css'
import Timer from '../Animations/Timer'

function ExampleWorker (props) {
  // action
  const {
    runMain,
    runWorker
  } = props
  // reducer
  const {
    exampleWorkerAnswer
  } = props
  const disabled  = exampleWorkerAnswer== 'calculating...'

  const [queenN , setQueenN] = useState(14)
  const [isWorker , setIsWorker] = useState(false)
  const onChange = (event) => {
    let n = event.target.value;
    if(n <= 14) {
      if(!disabled) setQueenN(event.target.value)
    }
  }

  const solveInWorker = () => {
    setIsWorker(true)
    runWorker(queenN)

  }
  const solveInMain = () => {
    setIsWorker(false)
    runMain(queenN)
  }

  const headerColor = () => {
    if(disabled){
      if(isWorker){
        return 'green'
      }else{
        return 'red'
      }
    }
    return ''
  }

  return (<div className='container'>
    <div className={`header ${headerColor()}`}>
    N =
    <input className='input' onChange={onChange} value={queenN} type="number" name="quantity" min="1" max="14"/>
    <button disabled={disabled} className={`button red ${disabled ? 'disabled' : ''}`} onClick={() => solveInMain() } >Solve in Main</button>
    <button disabled={disabled} className={`button green ${disabled ? 'disabled' : ''}`} onClick={() => solveInWorker()} >Solve in Worker</button>
    N-Queen Solver : {exampleWorkerAnswer}
    </div>
    <br/>
    <Timer/>
    <Slider/>
  </div>)
}

function mapActionsToProps (dispatch) {
  return bindActionCreators(
    {
      ...ExampleWorkerActions
    }
    , dispatch)
}

function mapStoreToProps ({ exampleWorkerAnswer }, ownProps) {
  return {
    exampleWorkerAnswer
  }
}

ExampleWorker.propTypes = {}
ExampleWorker.defaultProps = {}

export default connect(mapStoreToProps, mapActionsToProps)(ExampleWorker)