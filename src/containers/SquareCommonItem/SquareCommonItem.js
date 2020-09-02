import React from 'react';
import {ItemTypes} from '../../constants/dnd/types';
import {useDrag} from 'react-dnd';
import {useDispatch} from "react-redux";
import {addDraggedItem, removeHoveredSquares} from "../../redux/actions/draggedItem";
import CommonItem from "../../components/items/CommonItem/CommonItem";
import {removeEquippedItem} from "../../redux/actions/equippedItems";

const SquareCommonItem = ({coords: [x, y], mainCell, width, height, isInventoryId = false}) => {
  const dispatch = useDispatch();
  // Allow drag
  const [{}, drag] = useDrag({
    item: {type: ItemTypes.ITEM},
    begin() {
      dispatch(addDraggedItem([x, y], mainCell, width, height));
    },
    end() {
      // !== false coz can be 0
      if(isInventoryId !== false) {
        dispatch(removeEquippedItem(isInventoryId));
      }
      dispatch(removeHoveredSquares());
    },
    collect: () => {
      return ({});
    }
  })

  return (
    <CommonItem forwardedRef={drag}>
      {/*♘*/}
    </CommonItem>
  );
};

export default SquareCommonItem;