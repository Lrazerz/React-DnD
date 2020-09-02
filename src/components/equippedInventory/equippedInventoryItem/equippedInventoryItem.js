import React from 'react';
import styled from "styled-components";
import {useDrop} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {removeItems} from "../../../redux/actions/board";
import {setEquippedItem} from "../../../redux/actions/equippedItems";
import Overlay from "../../square/Overlay";

const Container = styled.div`
    width: 90%;
    position: relative;
    height: 16%;
    border-radius: 5px;
    background: linear-gradient(#878c8a,#636967);
    @media (max-width: 780px) {
      height: 100%;
      width: 17%;
      flex-direction: row;
    }
`;

const EquippedInventoryItem = ({cellId, allowedItemType, item, children}) => {
  const dispatch = useDispatch();
  const [draggedItem, cells] = useSelector(({draggedItem, equippedItems}) =>
    ([draggedItem, equippedItems.cells]));

  const {mainCell, width, height} = draggedItem;

  const [{isOver, canDrop}, drop] = useDrop({
    accept: allowedItemType,
    drop: (item, monitor) => {
      if(monitor.canDrop()) {
        dispatch(removeItems(mainCell, width, height));
        dispatch(setEquippedItem(cellId));
      }
    },
    canDrop: () => cells.find(cell => (cell.id === cellId && cell.item === null)),
    collect: (monitor) => {
      return ({isOver: monitor.isOver({ shallow: true }), canDrop: monitor.canDrop()});
    }
  })
  return (
    <Container ref={drop}>
      {children}
      {isOver && canDrop && <Overlay color='green' />}
      {isOver && !canDrop && <Overlay color='red' />}
      {!isOver && canDrop && <Overlay color='#889459' />}
    </Container>
  );
};

export default EquippedInventoryItem;