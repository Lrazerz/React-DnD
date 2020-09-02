import React, {useState, useEffect} from 'react'
import Square from "../../components/square/Square";
import {ItemTypes} from "../../constants/dnd/types";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {addItems, removeItems} from "../../redux/actions/board";
import Overlay from "../../components/square/Overlay";
import {setHoveredSquares} from "../../redux/actions/draggedItem";
import styled from "styled-components";
import theme from "../../constants/css/theme";

const Div = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box; 
  border: 1px solid ${theme.colors.lightGray}; 
`;

const BoardSquare = ({coords: [x,y], children}) => {
  const [isOver,setIsOver] = useState(false);

  const [hoveredSquare, allHoveredSquares, canDropRedux, mainCell, width, height] =
    // @ts-ignore - board does not exists on DefaultRootState
    useSelector(({board, draggedItem}) =>
    ([draggedItem.hoveredSquare, draggedItem.allHoveredSquares,
    draggedItem.canDrop, draggedItem.mainCell, draggedItem.width, draggedItem.height]));

  const dispatch = useDispatch();

  const [{}, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: (item, monitor) => {
      if(monitor.canDrop()) {
        if(item.isInventoryId === false) {
          dispatch(removeItems(mainCell, width, height));
        }
        dispatch(addItems([x,y]));
      }
    },
    hover: () => {
      if(!hoveredSquare || (hoveredSquare[0] !== x || hoveredSquare[1] !== y)) {
        dispatch(setHoveredSquares([x,y]));
      }
    },
    canDrop: () => canDropRedux,
  })

  useEffect(() => {
    const idx = allHoveredSquares.findIndex((el) => el[0] === x && el[1] === y);
    if(idx !== -1) {
      setIsOver(true);
    } else {
      setIsOver(false);
    }
  },[x,y,allHoveredSquares])

  return (
    <Div ref={drop}>
      <Square>{children}</Square>
      {isOver && !canDropRedux && <Overlay color={theme.colors.danger} />}
      {isOver && canDropRedux && <Overlay color={theme.colors.success} />}
    </Div>
  )
}

export default BoardSquare;