import { fork } from 'redux-saga/effects'
import ExampleWorker from '../ExampleWorker/ExampleWorker.saga'

export default function * sagaMiddleware () {
  yield fork(ExampleWorker)
}