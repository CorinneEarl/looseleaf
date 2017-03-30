import {createStore} from 'redux';
import reducer from './reducer';

var startingState = {
  username: "",
  token: ""
}

module.exports = createStore(reducer, startingState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
