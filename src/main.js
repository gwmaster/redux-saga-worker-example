import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga'
import { combineReducers, applyMiddleware ,  createStore } from 'redux'
import { Provider } from 'react-redux'
import myReducers from './containers/store/reducers'
import mySaga from './containers/store/sagas'
import {toWorkerMiddleware} from 'redux-saga-worker'
import ExampleWorker from './containers/ExampleWorker/ExampleWorker'

// create worker
import StoreWorker from './containers/storeWorker/store.worker'

function App() {
  const sagaMiddleware = createSagaMiddleware()
  const [workerMiddleware,initWorkerMiddleware] = new toWorkerMiddleware()

  let combinedReducers = combineReducers(myReducers)
  const middleware = [
    workerMiddleware, // must be first
    sagaMiddleware,
  ]
  const store = createStore(
    combinedReducers,
    applyMiddleware(...middleware)
  )
  // then run the saga
  sagaMiddleware.run(mySaga)
  // then init worker
  const onInit = () => {
    console.log("Main to Warker Iniylized")
  }
  const config = {
    store,
    storeWorker : new StoreWorker(),
    initConfig : {
      exampleParam : 'exampleValue'
    },
    onInit
  }
  initWorkerMiddleware(config)

  return (
    <Provider store={store}>
      <ExampleWorker/>
    </Provider>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'))
