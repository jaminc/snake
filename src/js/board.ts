import GameStatus from "./gameStatus";
import Apple from "./apple";
import Snake from "./snake";

class Board {
  dim: number;
  gameStatus: GameStatus;
  gameOver: boolean;
  apple: Apple;
  snake: Snake;

  constructor(dim: number) {
    this.dim = dim;
    this.gameStatus = new GameStatus();
    this.snake = new Snake(this);
    this.apple = new Apple(this);
  }
}

export default Board;
