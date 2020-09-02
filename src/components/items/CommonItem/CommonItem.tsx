import React from 'react';
import styled from "styled-components";

const Span = styled.span`
  display: block;
  position: relative;
  cursor: move;
  width: 100%;
  height: 100%;
  background-color: #000;
`;

interface Props {
  children: any,
  forwardedRef: React.Ref<any>;
}

const CommonItem: React.FC<Props> = ({children, forwardedRef}) => {
  return (
    <Span ref={forwardedRef}>{children}</Span>
  );
};

//@ts-ignore
export default CommonItem;