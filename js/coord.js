(function(root) {

  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var Coord = SG.Coord = function (i, j) {
    this.i = i;
    this.j = j;
  };

  Coord.prototype.plus = function (coord2) {
    return new Coord(
      this.i + coord2.i,
      this.j + coord2.j
    );
  };

  Coord.prototype.equals = function (coord2) {
    return this.i === coord2.i && this.j === coord2.j;
  };

  Coord.prototype.isOpposite = function () {

  };

}(this));
