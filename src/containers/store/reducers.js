import {autoReducer} from 'fast-redux-reducer'
import ExampleWorker from '../ExampleWorker/ExampleWorker.reducer'
export const reducersObject = {
  ExampleWorker
}
export default autoReducer(reducersObject)