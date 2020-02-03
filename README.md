# Run locally
`npm start`

# Open in browser
[Live Example Click here](http://gwmaster.byethost32.com/redux-saga-worker-example/)

Check out the demo:
![](http://g.recordit.co/hqYTQFzZZJ.gif)


## Dependency

https://www.npmjs.com/package/worker-loader


## Intro

Enrich Redux store actions:
The middleware enable users to perform complex tasks in the client side at real-time with high performance.

If you have an application that processes big data in real-time or handle millions of events in client side, 
then this middleware will allow the application to be easily scaled without the worry of managing web worker threads and communication.

The middleware enriches the standard redux store actions by allowing the user to specify actions to be be send directly to web workers or main thread.
By defining the "sendTo" attribute in the action, the action will perform in the main thread or new web worker.
then, information is saved to the standard redux store and will be accessible to all of the components in the application.


## Demo
A minimal example can be found as below:

Web Worker: `src/containers/storeWorker/store.worker.js`:
```javascript
import myReducers from './reducers'
import mySaga from './sagas'
import {workerStore} from 'redux-saga-worker'
const config = {
  saga : mySaga, // required
  reducers : myReducers, // required
}
workerStore(config)
```

workerStore(config):

| Param        | Description           | Required  |
| ------------- |:-------------:| -----:|
| saga          | saga          | required |
| reducers      | reducers      |   required |
| onInit        | onInit = (initParams) => {}     |   optional |  
| middleware | [] |  optional |
|serialize | (data) => { return JSON.stringify(data)} | optional |
|deserialize | (data) => {return JSON.parse(data)} | optional |


ActionCreator: `src/containers/ExampleWorker/ExampleWorker.action.js`
```javascript
import { WORKERS } from 'redux-saga-worker'
// execute on worker
const runWorker = payload => ({ type: EXAMPLE_WORKER.RUN_WORKER_SAGA, payload, sendTo: WORKERS.WORKER })
// execute on Main
const runMain = payload => ({ type: EXAMPLE_WORKER.RUN_WORKER_SAGA, payload})
```

WORKERS : {
    ALL,
    WORKER,
    MAIN
}


Then in your store configuration,
```javascript
import {toWorkerMiddleware} from 'redux-saga-worker'
// create worker
import StoreWorker from './containers/storeWorker/store.worker'

function App() {
  // redux-saga
  const sagaMiddleware = createSagaMiddleware()
  // redux-saga-worker
  const [workerMiddleware,initWorkerMiddleware] = new toWorkerMiddleware()

  let combinedReducers = combineReducers(myReducers)
  const middleware = [
    workerMiddleware, //redux-saga-worker must be first
    sagaMiddleware,
  ]
  const store = createStore(
    combinedReducers,
    applyMiddleware(...middleware)
  )
  // then run the saga
  sagaMiddleware.run(mySaga)
  // then run the redux-saga-worker
  const config = {
    store, // required
    storeWorker : new StoreWorker(), // required
  }
  initWorkerMiddleware(config)

  return (
    <Provider store={store}>
     ...
    </Provider>
  );
}
```

new StoreWorker(workerName = WORKERS.WORKER) 

initWorkerMiddleware(config):

| Param        | Description           | Required  |
| ------------- |:-------------:| -----:|
| store | main store          | required | 
| storeWorker          | new StoreWorker()          | required |
| onInit        | onInit = ({workerName}) => {}     |  optional| 
|initConfig | JSON | optional |
|serialize | (data) => { return JSON.stringify(data)} | optional |
|deserialize | (data) => {return JSON.parse(data)} | optional |

webpack.config.js
```javascript
    {
      module: {
        rules: [
          {
            test: /\.worker\.js$/,
            use: { loader: 'worker-loader' }
          }
        ]
      }
    }
```








## License
MIT
