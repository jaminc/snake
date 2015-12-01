(function(root) {

  var DIR = ["N", "E", "S", "W"];
  var Snake = root.snake;


  Snake = function () {
    this.dir = DIR[0];
    this.segments = [];

  };

  Snake.prototype.move = function () {
    switch (this.dir) {
      case "N":

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
