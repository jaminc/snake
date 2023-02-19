(function (root) {
  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var Apple = (SG.Apple = function (board) {
    this.board = board;
    // this.color = this.randomAppleColor();

    this.place();
  });

  Apple.COLORS = ["red", "yellow", "blue", "green", "orange"];

  Apple.prototype.randomAppleColor = function () {
    var idx = Math.floor(Math.random() * Apple.COLORS.length);
    return Apple.COLORS[idx];
  };

  Apple.prototype.place = function () {
    var x = Math.floor(Math.random() * this.board.dim);
    var y = Math.floor(Math.random() * this.board.dim);

    while (this.board.snake.isOccupying([x, y])) {
      x = Math.floor(Math.random() * this.board.dim);
      y = Math.floor(Math.random() * this.board.dim);
    }

    // this.color = this.randomAppleColor();
    this.position = new SG.Coord(x, y);
  };
})(this);
