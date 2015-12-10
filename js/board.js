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

}(this));
