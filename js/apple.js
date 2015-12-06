(function(root) {

  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var Apple = SG.Apple = function (board) {
    this.board = board;
    this.place();
  };

  Apple.prototype.place = function () {
    var x = Math.floor(Math.random() * this.board.dim);
    var y = Math.floor(Math.random() * this.board.dim);

    while (this.board.snake.isOccupying([x, y])) {
      x = Math.floor(Math.random() * this.board.dim);
      y = Math.floor(Math.random() * this.board.dim);
    }

    this.position = new SG.Coord(x, y);
  };

}(this));
