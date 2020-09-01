import {SQUARES_FILL, SQUARES_RELEASE} from "./types";
import {xMax, xMin, yMax, yMin} from "../../constants/boardDimensions";
import store from "../store";
import {setAlert} from "./alert";

// mainCell, width, height // mainCell = [x,y]
const _addInventory = (boxId,x,y) => {
  return (dispatch, getState) => {
    const {board} = getState().board;

    const allAddedSquares = [];
    let alertMsg = '';

    for (let i = boxId[0]; i < boxId[0] + x; i++) {
      for (let j = boxId[1]; j < boxId[1] + y; j++) {
        allAddedSquares.push([i, j]);
      }
    }

    let canAdd = true;

    for (let i = xMin; i <= xMax; i++) {
      for (let j = yMin; j <= yMax; j++) {
        allAddedSquares.forEach(hoveredSquare => {
          const [hoveredX, hoveredY] = hoveredSquare;
          if (hoveredX < xMin || hoveredX > xMax || hoveredY < yMin || hoveredY > yMax) {
            canAdd = false;
            alertMsg = 'The object can not be placed outside the board.\n' +
              'The board has the following coordinates:\n' +
              `x: ${xMin} - ${xMax}\ny: ${yMin} - ${yMax}`;
          } else if (hoveredX === i && hoveredY === j) {
            if (board[j][i] !== null) {
                canAdd = false;
              alertMsg = 'The object can not be placed on the other object!'
            }
          }
        });
      }
    }

    if(canAdd) {
      dispatch(_addItems(allAddedSquares, boxId, x, y));
    } else {
      dispatch(setAlert('Sorry. ' + alertMsg, 'danger'));
    }
  }
}

// add function to be able use from console
window.addInventory = (boxId, x, y) => store.dispatch(_addInventory(boxId, x, y));

const _addItems = (squares, mainCell, width, height) => {
  return {type: SQUARES_FILL, squares, mainCell, width, height};
}

const _removeItems = (coordsArr) => {
  return {type: SQUARES_RELEASE, squares: coordsArr};
}

// add items fetched from hovered items
const addItems = ([x,y]) => {
  return (dispatch, getState) => {
    const {allHoveredSquares, xDown, yDown, width, height} = getState().draggedItem;

    dispatch(_addItems(allHoveredSquares, [x - xDown, y - yDown], width, height));
  }
}

// remove items from board
const removeItems = ([x,y], width = 1, height = 1) => {
  return dispatch => {
    const itemsToRemove = [];
    for(let currX = x; currX < x + width; currX++) {
      for(let currY = y; currY < y + height; currY++) {
        itemsToRemove.push([currX,currY]);
      }
    }

    dispatch(_removeItems(itemsToRemove));
  }
}

export {
  addItems,
  removeItems
}