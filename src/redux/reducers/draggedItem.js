import {
  DRAGGED_ITEM_SET,
  DRAGGED_ITEM_RELEASE,
  HOVERED_SQUARES_SET,
  HOVERED_SQUARES_REMOVE
} from "../actions/types";

const initialState = {
  mainCell: null,
  width: null,
  height: null,

  xUp: null,
  xDown: null,
  yUp: null,
  yDown: null,

  // Square, hovered with mouse
  hoveredSquare: null,
  // All hovered squares depending on the size of the item
  allHoveredSquares: [],

  canDrop: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DRAGGED_ITEM_SET: {
      const {mainCell, width, height,xUp,xDown,yUp,yDown} = action;
      return {
        ...state,
        mainCell,
        width,
        height,
        xUp,
        xDown,
        yUp,
        yDown
      }
    }
    case DRAGGED_ITEM_RELEASE:
    case HOVERED_SQUARES_REMOVE: {
      return initialState;
    }
    case HOVERED_SQUARES_SET: {
      return {
        ...state,
        hoveredSquare: action.point,
        allHoveredSquares: action.squares,
        canDrop: action.canDrop,
      }
    }
    default: {
      return state;
    }
  }
}
