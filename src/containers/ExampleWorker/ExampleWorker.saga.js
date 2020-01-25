import { takeLatest , put , delay } from 'redux-saga/effects'
import { EXAMPLE_WORKER } from './ExampleWorker.const'
import solve from './solver'
import { WORKERS } from 'redux-saga-worker'

function * runWorkerSaga({payload : queenN}) {
  yield put({ type: EXAMPLE_WORKER.ANSWER, payload : 'calculating...', sendTo: WORKERS.MAIN })
  yield delay(100)
  let result = solve(+queenN).length
  yield put({ type: EXAMPLE_WORKER.ANSWER, payload : `for N = ${queenN} result : ${result}`, sendTo: WORKERS.MAIN })
}


export default function * () {
  yield takeLatest(EXAMPLE_WORKER.RUN_WORKER_SAGA, runWorkerSaga)
}
