import {
  EQUIPPED_ITEM_SET,
  EQUIPPED_ITEM_REMOVE
} from "../actions/types";
import {ItemTypes} from "../../constants/dnd/types";

// cells[x] - {id: number, allowedItemType: string, item: null | {mainCell, width, height}}
const initialState = {
  cells: [],
}

const fillInitialState = () => {
  const cells = [];
  for(let i = 0; i < 10; i++) {
    if(i === 0) {
      cells[i] = {
        id: i,
        allowedItemType: ItemTypes.ITEM,
        item: null,
      }
    } else {
      cells[i] = {
        id: i,
        allowedItemType: 'SomeOtherType',
        item: null,
      }
    }
  }
  return {cells};
}

export default (state = fillInitialState(), action) => {
  switch (action.type) {
    case EQUIPPED_ITEM_SET: {
      const cells = [...state.cells];
      cells[action.id] = {
        ...cells[action.id],
        item: action.item,
      }
      return {
        ...state,
        cells,
      }
    }
    case EQUIPPED_ITEM_REMOVE: {
      const cells = [...state.cells];
      cells[action.id] = {
        ...cells[action.id],
        item: null,
      }
      return {
        ...state,
        cells,
      };
    }
    default: {
      return state;
    }
  }
}
