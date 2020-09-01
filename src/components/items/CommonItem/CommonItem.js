import React from 'react';
import styled from "styled-components";

const Span = styled.span`
  display: block;
  position: relative;
  cursor: move;
  width: 100%;
  height: 100%;
  background-color: black;
`;

const CommonItem = ({children, forwardedRef}) => {
  return (
    <Span ref={forwardedRef}>{children}</Span>
  );
};

export default CommonItem;