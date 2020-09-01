import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from 'styled-components';
import Board from "./components/board/Board";
import Alert from "./components/layout/Alert/Alert";
import InventoryContainer from "./components/inventoryContainer/InventoryContainer";

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    padding: 2%;
    background-color: green;
    @media (max-width: 780px) {
        flex-direction: column;
    }
}
`

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Alert/>
        <InventoryContainer/>
        <Board />
        <InventoryContainer/>
      </Container>
    </DndProvider>
  );
}


export default App;
