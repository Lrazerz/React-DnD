import {combineReducers} from 'redux';
import boardReducer from './board';
import alertReducer from './alert';
import draggedItemReducer from './draggedItem';

export default combineReducers({
  board: boardReducer,
  alert: alertReducer,
  draggedItem: draggedItemReducer,
})