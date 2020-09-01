import React, {useEffect, useRef, useState} from 'react';
import CommonItem from "../items/CommonItem/CommonItem";
import BoardSquare from "../../containers/BoardSquare/BoardSquare";
import {yMax, yMin, xMax, xMin} from "../../constants/boardDimensions";
import {useSelector} from "react-redux";
import styled from "styled-components";

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

const Board = () => {
  const squares = [];
  const boardItems = useSelector(({board}) => board.board);
  // proportional to width (17x6)
  const [boardHeight, setBoardHeight] = useState(null);

  const boardEl = useRef(null);

  // Make item proportional no matter where it placed
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      const width = boardEl.current.clientWidth;
      setBoardHeight(width * 0.35);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial size
    handleResize();


    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  const renderSquare = (y, x) => {
    if (!boardItems) {
      return null;
    }
    let squareContent = null;
    // Check if filled
    const item = boardItems[y][x];
    if (item) {
      const {mainCell, width, height} = item;
      squareContent = <CommonItem coords={[x, y]} mainCell={mainCell}
                                  width={width} height={height}/>;
    }
    return (
      <div key={[x, y]} style={{
        height: '100%',
        boxSizing: 'border-box', borderTop: '3px solid gray', borderLeft: '3px solid gray',
      }}>
        <BoardSquare coords={[x, y]}>
          {squareContent}
        </BoardSquare>
      </div>
    );
  }

  for (let y = yMin; y <= yMax; y++) {
    for (let x = xMin; x <= xMax; x++) {
      squares.push(renderSquare(y, x));
    }
  }

  return (
    <Container ref={boardEl} style={{height: `${boardHeight + 0}px`}}>
      {squares}
    </Container>
  )
};

export default Board;