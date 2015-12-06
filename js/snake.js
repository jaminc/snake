(function(root) {

  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var Snake = SG.Snake = function (board) {
    this.board = board;
    this.dir = "N";
    this.turning = false;

    this.segments = [new SG.Coord(19, 10)];
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
    var newPos;

    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));

    if (this.eatApple()) {
      this.board.apple.place();
    }

    if (this.growLength > 0) {
      this.growLength -= 1;
    } else {
      this.segments.shift();
    }

  };

  Snake.prototype.turn = function (newDirection) {
    this.dir = newDirection;
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
      console.log("orhijpokp");
      return true;
    } else {
      return false;
    }
  };

}(this));
