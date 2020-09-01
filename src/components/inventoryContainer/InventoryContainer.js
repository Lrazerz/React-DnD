import React from 'react';
import styled from 'styled-components';
import InventoryItem from "./InventoryItem/InventoryItem";

const InventoryContainer = () => {

  const Container = styled.div`
    width: 15%;
    max-width: 15%;
    height: 100vh;
    box-sizing: border-box;
    padding: 2%;
    background-color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    @media (max-width: 780px) {
      height: 20vh;
      min-width: 100%;
      flex-direction: row;
    }
  `;

  return (
    <Container>
      <InventoryItem/>
      <InventoryItem/>
      <InventoryItem/>
      <InventoryItem/>
      <InventoryItem/>
    </Container>
  );
};

export default InventoryContainer;