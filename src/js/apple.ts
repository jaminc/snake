import Coord from "./coord";
import Board from "./board";

class Apple {
  static COLORS = ["red", "yellow", "blue", "green", "orange"];

  board: Board;
  position: Coord;

  constructor(board: Board) {
    this.board = board;

    this.place();
  }

  randomAppleColor() {
    const idx: number = Math.floor(Math.random() * Apple.COLORS.length);

    return Apple.COLORS[idx];
  }

  place() {
    const randomBoardIdx = () => Math.floor(Math.random() * this.board.dim);

    let x = randomBoardIdx();
    let y = randomBoardIdx();

    while (this.board.snake.isOccupying([x, y])) {
      x = randomBoardIdx();
      y = randomBoardIdx();
    }

    this.position = new Coord(x, y);
  }
}

export default Apple;
