(function(root) {

  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var Snake = SG.Snake = function (board) {
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
    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));
    this.segments.shift();
  };

  Snake.prototype.turn = function (newDirection) {
    this.dir = newDirection;
  };

}(this));
