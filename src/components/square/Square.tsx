import React from 'react'
import styled from "styled-components";
import theme from "../../constants/css/theme";

const Container = styled.div`
  backgroundColor: background: linear-gradient(${theme.colors.gray},${theme.colors.lighterGray});
  width: 100%;
  height: 100%;
  display: flex;
  justifyContent: center;
  alignItems: center;
`;



interface Props {
  children: any;
}

const Square: React.FC<Props> = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

//@ts-ignore
export default Square;