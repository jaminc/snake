(function(root) {

  var Coord = root.Coord;

  Coord = function (i, j) {
    this.i = i;
    this.j = j;
  };

  Coord.prototype.equals = function (coord2) {
    return this.i === coord2.i && this.j === coord2.j;
  };

  Coord.prototype.isOpposite = function () {

  };

}(this));
