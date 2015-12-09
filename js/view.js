(function(root) {

  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var View = SG.View = function ($el) {
    this.$el = $el;

    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_MILLIS
    );

    this.board = new SG.Board(20);
    this.snake = this.board.snake;
    this.snake.colorTimer = 1000;

    this.moveDelay = View.MOVE_DELAY;
    this.gamePaused = false;

    this.setUpGrid();

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.STEP_MILLIS = 20;
  View.MOVE_DELAY = 4;

  View.prototype.handleKeyEvent = function (event) {
    var keyCode = event.keyCode;

    if (View.KEYS[keyCode]) {
      this.snake.turn(View.KEYS[keyCode]);
    } else if (keyCode === 80) {
      this.toggleGamePaused();
    }
  };

  View.prototype.render = function () {
    this.updateClasses([this.board.apple.position], "apple");

    if (this.snake.colorTimer <= 0) {
      this.updateClasses(this.snake.segments, "snake");
      this.updateClasses(this.snake.segments, "white-snake");
      this.snake.transitionSegment = 0;
    }

    if (this.snake.colorTimer > 0) {
      var snakeSegments = this.snake.segments.slice(0, this.snake.segments.length);
      var currentSegments = snakeSegments.slice(0, this.snake.transitionSegment);
      var reverseSegments = snakeSegments.reverse().slice(0, this.snake.transitionSegment);
      this.updateClasses(currentSegments, "snake");
    }

    this.updateClasses([this.snake.head()], "snake-head");

    $(".score").text("Score: " + this.board.GameStatus.score);
  };

  View.prototype.step = function () {
    if (this.board.gameOver) {
     this.gameOver();
    } else {
      if (this.moveDelay <= 0) {
        this.moveDelay = View.MOVE_DELAY;
        this.snake.move();
        this.render();
      } else {
        this.moveDelay -= 1;
      }

      this.snake.colorTimer -= View.STEP_MILLIS;
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
    var html = "<div class='game-window-container group'>";

    html += "<div class='game-window ' >";

    for (var i = 0; i < this.board.dim; i++) {
      html += "<ul class='row group'>";
      for (var j = 0; j < this.board.dim; j++) {
        html += "<li class='row-tile' ></li>";
      }
      html += "</ul>";
    }

    html += "</div>";

    html += (
      "<div class='game-paused screen-text text-off'>" +
        "GAME PAUSED<br>" +
        "Press P to Resume" +
      "</div>"
    );

    html += (
      "<div class='game-over screen-text text-off'>" +
        "GAME OVER<br>" +
        "Click to Restart" +
      "</div>"
    );

    html += "</div>";

    this.$el.html(html);
    this.$li = this.$el.find("li");
  };

  View.prototype.toggleGamePaused = function () {
    this.gamePaused = !this.gamePaused;
    $(".game-paused").toggleClass("text-off");
    $(".pause-prompt").toggleClass("text-off");

    if (this.gamePaused) {
      // $(window).off('keydown');
      clearInterval(this.intervalId);
    } else {
      // $(window).on("keydown", this.handleKeyEvent.bind(this));
      this.intervalId = window.setInterval(
        this.step.bind(this),
        View.STEP_MILLIS
      );
    }

  };

  View.prototype.gameOver = function () {
    clearInterval(this.intervalId);
    $(".pause-prompt").toggleClass("text-off");
    $(window).off('keydown');
    $(".game-over").toggleClass("text-off");

    this.updateClasses(this.snake.segments, "snake");

    this.$el.one('click', function () {
      this.$el.empty();
      this.board = new SG.Board(20);
      this.snake = this.board.snake;
      this.setUpGrid();
      $(".pause-prompt").toggleClass("text-off");
      $(window).on("keydown", this.handleKeyEvent.bind(this));

      this.intervalId = window.setInterval(
        this.step.bind(this),
        View.STEP_MILLIS
      );
    }.bind(this));
  };

  View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W",
    87: "N",
    68: "E",
    83: "S",
    65: "W",
    73: "N",
    76: "E",
    75: "S",
    74: "W",
  };

}(this));
