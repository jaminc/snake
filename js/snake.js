(function(root) {

  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var Snake = SG.Snake = function (board) {
    this.board = board;
    this.GameStatus = board.GameStatus;
    this.dir = "N";
    this.turning = false;
    this.colorTimer = 0;
    this.color = "blue";
    this.transitionSegment = 0;

    this.segments = [new SG.Coord(10, 10)];
    this.removedSegment = [];
  };

  Snake.DIFFS = {
    "N": new SG.Coord(-1, 0),
    "E": new SG.Coord(0, 1),
    "S": new SG.Coord(1, 0),
    "W": new SG.Coord(0, -1)
  };

  Snake.prototype.head = function () {
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.move = function () {
    var newPos = this.newMovePosition();

    this.segments.push(newPos);

    this.turning = false;

    if (this.eatApple()) {
      this.board.apple.place();
    }

    if (this.growLength > 0) {
      this.growLength -= 1;
    } else {
      this.removedSegment = this.segments[0];
      this.segments.shift();
    }

    if (!this.isValidMove()) {
      this.board.gameOver = true;
    }

  };

  Snake.prototype.newMovePosition = function () {
    var newPos = this.head().plus(Snake.DIFFS[this.dir]);

    if (newPos.i < 0) {
      newPos = new SG.Coord(this.board.dim - 1, newPos.j);
    } else if (newPos.j < 0) {
      newPos = new SG.Coord(newPos.i, this.board.dim - 1);
    } else if (newPos.i >= this.board.dim) {
      newPos = new SG.Coord(0, newPos.j);
    } else if (newPos.j >= this.board.dim) {
      newPos = new SG.Coord(newPos.i, 0);
    }

    return newPos;
  };

  Snake.prototype.turn = function (newDirection) {
    if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[newDirection]) || this.turning) {
      return;
    } else {
      this.turning = true;
      this.dir = newDirection;
    }
  };

  Snake.prototype.isOccupying = function (pos) {
    var occupying = false;

    this.segments.forEach(function (segment) {
      if (segment.i === pos[0] && segment.j === pos[1]) {
        occupying = true;
      }
    });

    return occupying;
  };

  Snake.prototype.eatApple = function () {
    if (this.head().equals(this.board.apple.position)) {
      this.growLength = 1;
      // this.color = this.board.apple.color;
      this.GameStatus.score += 100;

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
  };

  Snake.prototype.isValidMove = function () {
    for (var i = 0; i < this.segments.length - 1; i++) {
      if (this.head().equals(this.segments[i])) {
        return false;
      }
    }

    return true;
  };

}(this));
