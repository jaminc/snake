(function(root) {

  var Board = root.Board;

  Board = function (dim) {
    this.dim = dim;
    this.snake = new Snake(this);
  };

  Board.BLANK_SYMBOL = ".";

  Board.blankGrid = function (dim) {
    var grid = [];

    for (var i = 0; i < dim; i++) {
      var row = [];
      for (var j = 0; j < dim; j++) {
        row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }

    return grid;
  };

  Board.prototype.render = function () {
    var grid = Board.blankGrid(this.dim);

    var rowStrs = [];
    grid.map(function (row) {
      return row.join("");
    }).join("\n");
  };

}(this));

module.exports = Board;
