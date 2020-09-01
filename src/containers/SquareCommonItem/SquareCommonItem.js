import React from 'react';
import {ItemTypes} from '../../constants/dnd/types';
import {useDrag} from 'react-dnd';
import {useDispatch} from "react-redux";
import {addDraggedItem, removeHoveredSquares} from "../../redux/actions/draggedItem";
import CommonItem from "../../components/items/CommonItem/CommonItem";

const SquareCommonItem = ({coords: [x, y], mainCell, width, height}) => {
  const dispatch = useDispatch();
  // Allow drag
  const [{}, drag] = useDrag({
    item: {type: ItemTypes.ITEM},
    begin() {
      dispatch(addDraggedItem([x, y], mainCell, width, height));
    },
    end() {
      dispatch(removeHoveredSquares());
    },
    collect: (monitor) => {
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