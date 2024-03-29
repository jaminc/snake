import Coord from "./coord";
import Board from "./board";
import GameStatus from "./gameStatus";

export enum Direction {
  N = "N",
  E = "E",
  S = "S",
  W = "W",
}

class Snake {
  board: Board;
  gameStatus: GameStatus;
  dir: Direction;
  turning: boolean;
  disappearing: boolean;
  colorTimer: number;
  color: string;
  transitionSegment: number;
  segments: Array<Coord>;
  removedSegment: Array<Coord>;
  growLength: number;

  static DIFFS = {
    [Direction.N]: new Coord(-1, 0),
    [Direction.E]: new Coord(0, 1),
    [Direction.S]: new Coord(1, 0),
    [Direction.W]: new Coord(0, -1),
  };

  constructor(board: Board) {
    this.board = board;
    this.gameStatus = board.gameStatus;
    this.dir = Direction.N;
    this.turning = false;
    this.colorTimer = 0;
    this.color = "blue";
    this.transitionSegment = 0;
    this.disappearing = false;

    this.segments = [new Coord(10, 10)];
    this.removedSegment = [];
  }

  head(): Coord {
    return this.segments[this.segments.length - 1];
  }

  move() {
    const newPos = this.newMovePosition();

    this.segments.push(newPos);
    this.turning = false;

    if (this.eatApple()) {
      this.board.apple.place();
    }

    if (this.growLength > 0) {
      this.growLength -= 1;
    } else {
      // this.removedSegment = this.segments[0];
      this.segments.shift();
    }

    if (!this.isValidMove()) {
      this.board.gameOver = true;
    }
  }

  newMovePosition(): Coord {
    let newPos = this.head().plus(Snake.DIFFS[this.dir]);

    if (newPos.i < 0) {
      newPos = new Coord(this.board.dim - 1, newPos.j);
    } else if (newPos.j < 0) {
      newPos = new Coord(newPos.i, this.board.dim - 1);
    } else if (newPos.i >= this.board.dim) {
      newPos = new Coord(0, newPos.j);
    } else if (newPos.j >= this.board.dim) {
      newPos = new Coord(newPos.i, 0);
    }

    return newPos;
  }

  turn(newDirection: Direction) {
    if (
      Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[newDirection]) ||
      this.turning
    ) {
      return;
    } else {
      this.turning = true;
      this.dir = newDirection;
    }
  }

  isOccupying(pos: Array<number>) {
    let occupying = false;

    this.segments.forEach((segment) => {
      if (segment.i === pos[0] && segment.j === pos[1]) {
        occupying = true;
      }
    });

    return occupying;
  }

  eatApple(): boolean {
    if (this.head().equals(this.board.apple.position)) {
      this.growLength = 1;
      this.gameStatus.score += 100 + (this.segments.length - 2) * 10;

      if (this.colorTimer <= 0) {
        this.transitionSegment = 0;
      }

      this.disappearing = false;

      if (this.colorTimer <= 0) {
        this.colorTimer = 1500;
      } else {
        this.colorTimer += 1500;
      }

      return true;
    } else {
      return false;
    }
  }

  isValidMove(): boolean {
    for (let i = 0; i < this.segments.length - 1; i++) {
      if (this.head().equals(this.segments[i])) {
        return false;
      }
    }

    return true;
  }
}

export default Snake;
