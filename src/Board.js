import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let rowNum = 0; rowNum < nrows; rowNum++) {
      let row = []
      for (let colNum = 0; colNum < ncols; colNum++) {
        row.push(chanceLightStarts())
      }
      initialBoard.push(row)
    }
    return initialBoard;
  }

  function chanceLightStarts(chanceLightStartsOn) {
    let checkValue = Math.random()
    return checkValue > 0.5
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let rowNum = 0; rowNum < nrows; rowNum++) {
      for (let colNum = 0; colNum < ncols; colNum++) {
        if(board[rowNum][colNum] === false) {
          return false
        }
      }
    } 
    return true
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      let boardCopy = oldBoard.map((row) => [...row] )

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, boardCopy)
      flipCell(y+1, x, boardCopy)
      flipCell(y, x+1, boardCopy)
      flipCell(y-1, x, boardCopy)
      flipCell(y, x-1, boardCopy)


      // TODO: return the copy
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return (
      <div>
        <h1> You Have Won The Game!!!!!!</h1>
      </div>
    )
  }

  // TODO

  // make table board
  
  //
  let finalBoard = []
  for (let rowNum = 0; rowNum < nrows; rowNum++) {
    let row = []
    for (let colNum = 0; colNum < ncols; colNum++) {
      row.push(<Cell flipCellsAroundMe={flipCellsAround} isLit={board[rowNum][colNum]}/>)
    }
    finalBoard.push(row);
  }

  // TODO


  return(
    <table>
      <thead>
        {finalBoard}
      </thead>
    </table>
  )
}

export default Board;
