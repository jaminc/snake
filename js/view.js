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

    this.moveDelay = 5;
    this.gamePaused = false;

    this.setUpGrid();

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
    this.updateClasses([this.board.apple.position], "apple");

    if (this.snake.colorTimer <= 0) {
      this.updateClasses(this.snake.segments, "snake");
      this.updateClasses(this.snake.segments, "white-snake");
    }

    if (this.snake.colorTimer > 0) {
      this.updateClasses(this.snake.segments, "snake");
    }

    this.updateClasses([this.snake.head()], "snake-head");

    $(".score").text("Score: " + this.board.GameStatus.score);
  };

  View.prototype.step = function () {
    if (this.snake.segments.length > 0) {
      this.snake.move();
      this.snake.colorTimer -= View.STEP_MILLIS;
      this.render();
    } else {
      this.gameOver();
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
        "<div class='screen-text text-off'>" +
          "GAME PAUSED<br>" +
          "Press P to Resume" +
        "</div>"
    );

    html += "</div>";

    this.$el.html(html);
    this.$li = this.$el.find("li");
  };

  View.prototype.toggleGamePaused = function () {
    this.gamePaused = !this.gamePaused;
    $(".screen-text").toggleClass("text-off");
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
    this.$el.append(
      "<p class='screen-text'>" +
        "GAME OVER<br>" +
        "Click to Restart" +
      "</p>"
    );
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

}(this));
