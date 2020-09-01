import React from 'react';

import styled from "styled-components";

const Container = styled.div`
    width: 90%;
    height: 16%;
    border-radius: 10px;
    background-color: yellow;
    @media (max-width: 780px) {
      height: 100%;
      width: 17%;
      flex-direction: row;
    }
`;

const InventoryItem = () => {
  return (
    <Container/>
  );
};

export default InventoryItem;