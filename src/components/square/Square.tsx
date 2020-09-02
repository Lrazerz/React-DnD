import React from 'react'
import styled from "styled-components";

const Container = styled.div`
  backgroundColor: background: linear-gradient(#878c8a,#636967);
  width: 100%;
  height: 100%;
  display: flex;
  justifyContent: center;
  alignItems: center;
`;



interface Props {
  children: any;
}

const Square = ({children}: Props) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

//@ts-ignore
export default Square;