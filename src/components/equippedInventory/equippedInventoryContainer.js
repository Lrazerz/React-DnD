import React from 'react';
import styled from 'styled-components';
import EquippedInventoryItem from "./equippedInventoryItem/equippedInventoryItem";
import SquareCommonItem from "../../containers/SquareCommonItem/SquareCommonItem";
import theme from "../../constants/css/theme";

const EquippedInventoryContainer = ({cells}) => {

  const Container = styled.div`
    width: 15%;
    max-width: 15%;
    height: 100vh;
    box-sizing: border-box;
    padding: 2%;
    background: linear-gradient(${theme.colors.gray},${theme.colors.lighterGray});
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    @media (max-width: ${theme.breakpoints.md}px) {
      height: 20vh;
      min-width: 100%;
      flex-direction: row;
    }
  `;

  return (
    <Container>
      {cells.map(cell => {
        let children = null;
        if(cell.item) {
          const {mainCell, width, height} = cell.item;
          children = <SquareCommonItem coords={mainCell} mainCell={mainCell}
                                       width={width} height={height} isInventoryId={cell.id}/>
        }

        return (
          <EquippedInventoryItem cellId={cell.id} item={cell.item}
                                 allowedItemType={cell.allowedItemType}>
            {children}
          </EquippedInventoryItem>
        );
      })}
    </Container>
  );
};

export default EquippedInventoryContainer;