import { EXAMPLE_WORKER } from './ExampleWorker.const'
import { WORKERS } from 'redux-saga-worker'

const runWorker = payload => ({ type: EXAMPLE_WORKER.RUN_WORKER_SAGA, payload, sendTo: WORKERS.WORKER })
const runMain = payload => ({ type: EXAMPLE_WORKER.RUN_WORKER_SAGA, payload})


export const ExampleWorkerActions = {
  runWorker,
  runMain
}