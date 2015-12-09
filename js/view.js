(function(root) {

  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var View = SG.View = function ($el) {
    this.$el = $el;

    this.board = new SG.Board(20);
    this.GameStatus = this.board.GameStatus;
    this.snake = this.board.snake;

    this.setUpGrid();
    this.moveDelay = 5;
    this.gamePaused = false;

    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLIS
    );

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.STEP_MILLIS = 100;

  View.prototype.handleKeyEvent = function (event) {
    var keyCode = event.keyCode;

    if (View.KEYS[keyCode]) {
      this.snake.turn(View.KEYS[keyCode]);
    } else if (keyCode === 80) {
      this.toggleGamePaused();
    }
  };

  View.prototype.render = function () {
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.position], "apple");
    $(".score").text("Score: " + this.GameStatus.score);
  };

  View.prototype.step = function () {
    if (this.gamePaused) {
      return;
    } else if (this.snake.segments.length > 0) {
// console.log(this.moveDelay);
      // if (this.moveDelay > 0) {

        // this.moveDelay -= 1;
      // } else {
        // this.moveDelay = 5;
        this.snake.move();
      // }

      this.render();
    } else {
    }
  };

  View.prototype.updateClasses = function (coords, className) {
    this.$li.filter("." + className).removeClass();

    coords.forEach(function (coord) {
      var tileNumber = (coord.i * this.board.dim) + coord.j;
      this.$li.eq(tileNumber).addClass(className);
    }.bind(this));
  };

  View.prototype.setUpGrid = function () {
    var html = "<div class='game-window group'>";

    for (var i = 0; i < this.board.dim; i++) {
      html += "<ul class='row group'>";
      for (var j = 0; j < this.board.dim; j++) {
        html += "<li class='row-tile' ></li>";
      }
      html += "</ul>";
    }

    html += "<p class='pause-screen not-paused'>GAME PAUSED. Press P to Resume</p>";
    html += "</div>";

    this.$el.html(html);
    this.$li = this.$el.find("li");
  };

  View.prototype.toggleGamePaused = function () {
    this.gamePaused = !this.gamePaused;
    $(".pause-screen").toggleClass("not-paused");
  };

}(this));
