(function(root) {

  if (typeof SG === "undefined") {
    root.SG = {};
  }


  var Snake = SG.Snake = function (board) {
    this.dir = "N";
    this.board = board;
    this.turning = false;

    this.segments = [new SG.Coord(19, 10)];
  };

  Snake.SYMBOL = "S";

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
    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));

    this.turning = false;
    this.segments.shift();

    // switch (this.dir) {
    //   case "N":
    //     this.pos.i = this.pos.i + 1;
    //     break;
    //   case "E":
    //
    //     break;
    //   case "S":
    //
    //     break;
    //   case "W":
    //
    //     break;
    // }
  };

  Snake.prototype.turn = function (newDirection) {
    this.dir = newDirection;
  };

}(this));
