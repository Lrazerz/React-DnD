import {xMin, xMax, yMin, yMax} from "../../constants/boardDimensions";
import {SQUARES_FILL, SQUARES_RELEASE} from "../actions/types";

// board - matrix;
// board[y][x] - single cell, if null - empty,
// if {mainCell:[x,y],width,height} - filled
// const initialState = {
//   board: [],
// }

const fillInitialState = () => {
  const board = [];
  for (let y = yMin; y <= yMax; y++) {
    board[y] = [];
    for (let x = xMin; x <= xMax; x++) {
      if(x === 3 && y === 3 || x === 3 && y === 4 || x === 4 && y === 3 || x === 4 && y === 4
        || x === 3 && y === 2 || x === 4 && y === 2)
      {
        board[y][x] = {
          mainCell: [3,2],
          width: 2,
          height: 3
        };
      } else if (x === 8 && y === 4 ||x === 9 && y === 4
         ||x === 8 && y === 5 ||x === 9 && y === 5 )
      {
        board[y][x] = {
          mainCell: [8,4],
          width: 2,
          height: 2
        };
      } else board[y][x] = null;
    }
  }
  return {board};
}

export default (state = fillInitialState(), action) => {
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
