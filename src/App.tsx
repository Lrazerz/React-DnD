import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from 'styled-components';
import Board from "./components/board/Board";
import Alert from "./components/layout/Alert/Alert";
import EquippedInventoryContainer from "./components/equippedInventory/equippedInventoryContainer";
import {useSelector} from "react-redux";

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    padding: 2%;
    background: linear-gradient(#515754,#1e2120);
    @media (max-width: 780px) {
        flex-direction: column;
    }
}
`

const App: React.FC = () => {
  // @ts-ignore
  const equippedItemsCells = useSelector(({equippedItems}) => equippedItems.cells);
  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Alert/>
        <EquippedInventoryContainer cells={equippedItemsCells.slice(0,5)}/>
        <Board />
        <EquippedInventoryContainer cells={equippedItemsCells.slice(5,10)}/>
      </Container>
    </DndProvider>
  );
}


export default App;
