import {EQUIPPED_ITEM_SET, EQUIPPED_ITEM_REMOVE} from "./types";

const _setEquippedItem = (cellId, item) => {
  return {type: EQUIPPED_ITEM_SET, id: cellId, item}
}

const _removeEquippedItem = (cellId) => {
  return {type: EQUIPPED_ITEM_REMOVE, id: cellId}
}

const setEquippedItem = (cellId) => {
  return (dispatch, getState) => {
    const item = getState().draggedItem;
    const {mainCell, width, height} = item;

    dispatch(_setEquippedItem(cellId, {mainCell, width, height}));
  }
}

const removeEquippedItem = (cellId) => {
  return dispatch => {
    dispatch(_removeEquippedItem(cellId));
  }
}

export {setEquippedItem, removeEquippedItem};