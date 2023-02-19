(function (root) {
  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var GameStatus = (SG.GameStatus = function () {
    this.score = 0;
  });
})(this);
