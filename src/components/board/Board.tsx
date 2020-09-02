import React, {useEffect, useRef, useState} from 'react';
import BoardSquare from "../../containers/BoardSquare/BoardSquare";
import {yMax, yMin, xMax, xMin} from "../../constants/boardDimensions";
import {useSelector} from "react-redux";
import styled from "styled-components";
import SquareCommonItem from "../../containers/SquareCommonItem/SquareCommonItem";

const Container = styled.div`
    width: 68%;
    margin-left: 1%;
    margin-right: 1%;
    display: grid;
    grid-template-columns: repeat(17, 1fr);
    grid-template-rows: repeat(6, 1fr);
    overflow: hidden;
    @media (max-width: 780px) {
      margin: 1% auto;
      width: 100%;
    }
`;

const RenderSquare = styled.div`
    height: 100%;
    box-sizing: border-box; 
    border: 1px solid gray; 
`;

const Board = () => {
  const squares = [];
  // @ts-ignore - board does not exists on state
  const boardItems = useSelector(state => state.board.board);
  // proportional to width (17x6)
  const [boardHeight, setBoardHeight] = useState(null);

  const boardEl:React.MutableRefObject<null> | null = useRef(null);

  // Make element proportional no matter where it placed
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      const current: HTMLElement | null = boardEl.current;
      const width = current.clientWidth;
      setBoardHeight(width * 0.35294);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial size
    handleResize();


    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  const renderSquare = (y: number, x: number) => {
    if (!boardItems) {
      return null;
    }
    let squareContent = null;
    // Check if filled
    const item = boardItems[y][x];
    if (item) {
      const {mainCell, width, height} = item;
      squareContent = <SquareCommonItem coords={[x, y]} mainCell={mainCell}
                                        width={width} height={height}/>;
    }
    return (
      <RenderSquare key={x*20+y}>
        <BoardSquare coords={[x, y]}>
          {squareContent}
        </BoardSquare>
      </RenderSquare>
    );
  }

  for (let y = yMin; y <= yMax; y++) {
    for (let x = xMin; x <= xMax; x++) {
      squares.push(renderSquare(y, x));
    }
  }

  return (
    <Container ref={boardEl} style={{height: `${boardHeight+0}px`}}>
      {squares}
    </Container>
  )
};

export default Board;