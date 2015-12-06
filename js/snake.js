(function(root) {

  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var DIR = ["N", "E", "S", "W"];

  var Snake = SG.Snake = function () {
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
