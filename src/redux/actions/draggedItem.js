import {DRAGGED_ITEM_SET, HOVERED_SQUARES_SET, HOVERED_SQUARES_REMOVE} from "./types";
import {xMin, xMax, yMin, yMax} from "../../constants/boardDimensions";

const _addDraggedItem = (mainCell, width, height, xUp, xDown, yUp, yDown) => {
  return {type: DRAGGED_ITEM_SET, mainCell, width, height, xUp, xDown, yUp, yDown};
};

const _setHoveredSquares = (pointCoords, allHoveredSquares, canDrop) => {
  return {type: HOVERED_SQUARES_SET, point: pointCoords, squares: allHoveredSquares, canDrop};
};

const removeHoveredSquares = () => {
  return {type: HOVERED_SQUARES_REMOVE};
};

const addDraggedItem = ([x, y], mainCell = [x, y], width = 1, height = 1) => {
  return dispatch => {
    const [mainCellX, mainCellY] = mainCell;
    // Maximum X and Y for given item (border)
    const xMax = mainCellX + width - 1;
    const yMax = mainCellY + height - 1;

    // How many squares right from dragged point item fills (===0 when item 1x1 square)
    const xUp = xMax - x;
    // How many squares up from dragged point item fills
    const yUp = yMax - y;
    // How many squares left from dragged point item fills
    const xDown = x - mainCellX;
    // How many squares down from dragged point item fills
    const yDown = y - mainCellY;

    dispatch(_addDraggedItem(mainCell, width, height, xUp, xDown, yUp, yDown));
  };
};

const setHoveredSquares = ([x, y]) => {
  return (dispatch, getState) => {
    const {draggedItem: {xDown, xUp, yDown, yUp, mainCell, width, height}, board: {board}} = getState();

    const allHoveredSquares = [];

    for (let i = x - xDown; i <= x + xUp; i++) {
      for (let j = y - yDown; j <= y + yUp; j++) {
        allHoveredSquares.push([i, j]);
      }
    }
    // here we want to check canDrop
    let canDrop = true;
    for (let i = xMin; i <= xMax; i++) {
      for (let j = yMin; j <= yMax; j++) {
        allHoveredSquares.forEach(hoveredSquare => {
          const [hoveredX, hoveredY] = hoveredSquare;
          if (hoveredX < xMin || hoveredX > xMax || hoveredY < yMin || hoveredY > yMax) {
            canDrop = false;
          } else if (hoveredX === i && hoveredY === j) {
            if (board[j][i] !== null) {
              if(hoveredX < mainCell[0] || hoveredX > mainCell[0] + width - 1
                || hoveredY < mainCell[1] || hoveredY > mainCell[1] + height - 1) {
                canDrop = false;
              }
            }
          }
        });
      }
    }
    dispatch(_setHoveredSquares([x, y], allHoveredSquares, canDrop));
  }
};

export {
  addDraggedItem,
  removeHoveredSquares,
  setHoveredSquares
}