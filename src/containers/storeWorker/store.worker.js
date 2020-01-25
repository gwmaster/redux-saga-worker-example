import myReducers from './reducers'
import mySaga from './sagas'
import {workerStore} from 'redux-saga-worker'
const onInit = (initParams) => {
  console.log("Warker to Main Iniylized")
  console.log(initParams)
}
const config = {
  saga : mySaga,
  reducers : myReducers,
  onInit
}
workerStore(config)






