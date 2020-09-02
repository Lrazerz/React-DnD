import {xMin, xMax, yMin, yMax} from "../../constants/boardDimensions";
import {SQUARES_FILL, SQUARES_RELEASE} from "../actions/types";

// board - matrix;
// board[y][x] - single cell, if null - empty,
// if {mainCell:[x,y],width,height} - filled
// const initialState = {
//   board: [],
// }

// Set initial 2 items
const _fillInitialSquares = (x,y) => {
  switch(x) {
    // First item (2x3)
    case 3: {
      if(y === 2 || y === 3 || y === 4) {
        return {
          mainCell: [3,2],
          width: 2,
          height: 3
        };
      }
      return null;
      break;
    }
    case 4: {
      if(y === 2 || y === 3 || y === 4) {
        return {
          mainCell: [3,2],
          width: 2,
          height: 3
        }
      }
      return null;
      break;
    }
    // Second Item (2x2)
    case 8: {
      if(y === 4 || y === 5) {
        return {
          mainCell: [8,4],
          width: 2,
          height: 2
        }
      }
      return null;
      break;
    }
    case 9: {
      if(y === 4 || y === 5) {
        return {
          mainCell: [8,4],
          width: 2,
          height: 2
        }
      }
      return null;
      break;
    }
    default: {
      return null;
    }
  }
}

// Fill the matrix
const _fillInitialState = () => {
  const board = [];
  for (let y = yMin; y <= yMax; y++) {
    board[y] = [];
    for (let x = xMin; x <= xMax; x++) {
      board[y][x] = _fillInitialSquares(x,y);
    }
  }
  return {board};
}

export default (state = _fillInitialState(), action) => {
  switch (action.type) {
    case SQUARES_FILL: {
      // immutable way
      const newBoard = [...state.board];
      const {squares, mainCell, width, height} = action;
      squares.forEach(square => {
        const [x,y] = square;
        newBoard[y][x] = {
          mainCell,
          width,
          height
        };
      })
      return {
        ...state,
        board: newBoard,
      }
    }
    case SQUARES_RELEASE: {
      const newBoard = [...state.board];
      action.squares.forEach(square => {
        const [x,y] = square;
        newBoard[y][x] = null;
      })
      return {
        ...state,
        board: newBoard,
      }
    }
    default: {
      return state;
    }
  }
}
