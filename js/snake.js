(function(root) {

  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var DIR = ["N", "E", "S", "W"];

  var Snake = SG.Snake = function (board) {
    this.dir = DIR[0];
    this.board = board;
    this.turning = false;

    this.segments = [new SG.Coord(19, 10)];
    this.pos = new SG.Coord(19, 10);
  };

  Snake.SYMBOL = "S";

  Snake.prototype.move = function () {
    switch (this.dir) {
      case "N":
        this.pos.i = this.pos.i + 1;
        break;
      case "E":

        break;
      case "S":

        break;
      case "W":

        break;
    }
  };

  Snake.prototype.turn = function (newDirection) {
    this.dir = newDirection;
  };

}(this));
