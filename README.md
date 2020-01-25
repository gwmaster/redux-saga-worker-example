# Run locally
`npm start`

# Open in browser
[Live Example Click here](http://gwmaster.byethost32.com/redux-saga-worker-example/)

Check out the demo:
![](http://g.recordit.co/hqYTQFzZZJ.gif)


## Dependency

https://www.npmjs.com/package/worker-loader


## Intro

The goal of the middleware is to provide redux saga environment in Web Workers,
Communicate in fast and easy way.
Migrate in fast and easy way saga and reducers from main to workers.

## Demo
A minimal example can be found as below:

Web Worker: `src/containers/storeWorker/store.worker.js`:
```javascript
import myReducers from './reducers'
import mySaga from './sagas'
import {workerStore} from 'redux-saga-worker'
const config = {
  saga : mySaga,
  reducers : myReducers,
}
workerStore(config)
```

ActionCreator: `src/containers/ExampleWorker/ExampleWorker.action.js`
```javascript
import { WORKERS } from 'redux-saga-worker'
// execute on worker
const runWorker = payload => ({ type: EXAMPLE_WORKER.RUN_WORKER_SAGA, payload, sendTo: WORKERS.WORKER })
// execute on Main
const runMain = payload => ({ type: EXAMPLE_WORKER.RUN_WORKER_SAGA, payload})
```

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
    store, // must
    storeWorker : new StoreWorker(), // must
  }
  initWorkerMiddleware(config)

  return (
    <Provider store={store}>
     ...
    </Provider>
  );
}
```

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


workerStore(config):

| Param        | Description           | Required  |
| ------------- |:-------------:| -----:|
| saga          | saga          | required |
| reducers      | reducers      |   required |
| onInit        | onInit = (initParams) => {}     |   optional |   



initWorkerMiddleware(config):

| Param        | Description           | Required  |
| ------------- |:-------------:| -----:|
| store | main store          | required | 
| storeWorker          | new StoreWorker()          | required |
| onInit        | onInit = () => {}     |  optional| 
|initConfig | JSON | optional |


## License
MIT
