(function(root) {

  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var Board = SG.Board = function (dim) {
    this.dim = dim;

    this.GameStatus = new SG.GameStatus();
    this.snake = new SG.Snake(this);
    this.apple = new SG.Apple(this);
  };

  // Board.BLANK_SYMBOL = ".";

  // Board.blankGrid = function (dim) {
  //   var grid = [];
  //
  //   for (var i = 0; i < dim; i++) {
  //     var row = [];
  //     for (var j = 0; j < dim; j++) {
  //       row.push(Board.BLANK_SYMBOL);
  //     }
  //     grid.push(row);
  //   }
  //
  //   return grid;
  // };
  //
  // Board.prototype.render = function () {
  //   var grid = Board.blankGrid(this.dim);
  //
  //   this.snake.segments.forEach(function (segment) {
  //     grid[segment.i][segment.j] = Snake.SYMBOL;
  //   });
  //
  //   grid.map(function (row) {
  //     return row.join("");
  //   }).join("\n");
  // };

}(this));
