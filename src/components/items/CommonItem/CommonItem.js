import React from 'react';
import {ItemTypes} from '../../../constants/dnd/types';
import {useDrag} from 'react-dnd';
import {useDispatch} from "react-redux";
import {addDraggedItem, removeHoveredSquares} from "../../../redux/actions/draggedItem";
import styled from "styled-components";

const Span = styled.span`
  display: block;
  position: relative;
  cursor: move;
  width: 100%;
  height: 100%;
  background-color: black;
`;

const CommonItem = ({coords: [x, y], mainCell, width, height}) => {
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
    <Span ref={drag}>
      {/*♘*/}
    </Span>
  );
};

export default CommonItem;