(function(root) {

  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var View = SG.View = function ($el) {
    if (typeof window.localStorage.highScore === "undefined") {
      window.localStorage.highScore = 0;
    }

    this.$el = $el;
    this.setUpGame(View.BOARD_DIM);
    $(window).on("keydown", this.startGame.bind(this));
  };

  View.prototype.setUpGame = function (dim) {
    this.board = new SG.Board(dim);
    this.snake = this.board.snake;
    this.snake.colorTimer = 0;

    this.moveDelay = View.MOVE_DELAY;
    this.gamePaused = false;

    this.setUpGrid();
    this.render();
  };

  View.prototype.randomColor = function () {
    var idx = Math.floor(Math.random() * View.COLORS.length);
    return View.COLORS[idx];
  };

  View.prototype.startGame = function (event) {
    var keyCode = event.keyCode;

    if (View.KEYS[keyCode]) {
      this.snake.dir = View.KEYS[keyCode];
      $(".game-start").toggleClass("text-off");

      $(window).off('keydown');
      $(window).on("keydown", this.handleKeyEvent.bind(this));

      this.intervalId = window.setInterval(
        this.step.bind(this),
        View.STEP_MILLIS
      );
    }
  };

  View.prototype.handleKeyEvent = function (event) {
    var keyCode = event.keyCode;

    if (View.KEYS[keyCode]) {
      this.snake.turn(View.KEYS[keyCode]);
    } else if (keyCode === 80) {
      this.toggleGamePaused();
    }
  };

  View.prototype.render = function () {
    var snakeSegments = this.snake.segments.slice(0, this.snake.segments.length);
    var currentSegments = snakeSegments.slice(0, this.snake.transitionSegment);
    var reverseSegments = snakeSegments.reverse().slice(0, this.snake.transitionSegment);

    this.updateClasses([this.board.apple.position], "apple");

    if (this.snake.colorTimer <= 0 && !this.snake.disappearing) {
      this.snake.transitionSegment = 0;
      this.snake.disappearing = true;
      // this.snake.randomColor = this.randomColor();
      // console.log(color);
    } else if (this.snake.colorTimer <= 0 && this.snake.disappearing) {

      this.snake.transitionSegment += 1;
      this.updateClasses([this.snake.segments[0]], "snake");

      // var removedSegment = this.snake.removedSegment;
      // var tileNumber = (removedSegment.i * this.board.dim) + removedSegment.j;
      // this.$li.eq(tileNumber).removeClass();

      reverseSegments.forEach(function (coord) {
        var tileNumber = (coord.i * this.board.dim) + coord.j;
        this.$li.eq(tileNumber).removeClass();
        this.$li.eq(tileNumber).addClass("white-snake");
        // console.log(color);
        // this.$li.eq(tileNumber).css("background", this.snake.randomColor);
      }.bind(this));

      // this.updateClasses(reverseSegments, "white-snake");
    }

    if (this.snake.colorTimer > 0) {
      this.snake.transitionSegment += 1;
      this.updateClasses(currentSegments, "snake");
    }

    this.updateClasses([this.snake.head()], "snake-head");
    // this.updateClasses([this.snake.head()], View.SNAKE_DIRECTION[this.snake.dir]);

    $(".score").text("Score: " + this.board.GameStatus.score);
    $(".highScore").text("High Score: " + window.localStorage.highScore);

    if (this.snake.colorTimer <= 0) {
      // $(".color-timer").text("Clean Mode Timer: 0");
    } else {
      var time = Math.floor(this.snake.colorTimer / 100);
      var displayTime;
      if (time < 10) {
        displayTime = "0" + time;
      } else if (time < 100) {
        displayTime = " " + time;
      } else {
        displayTime = time;
      }

      $(".color-timer").text("Clean Power: " + displayTime);
    }
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
        this.render();
        this.moveDelay -= 1;
      }

      this.snake.colorTimer -= View.STEP_MILLIS;
    }
  };

  View.prototype.updateClasses = function (coords, className) {
    this.$li.filter("." + className).removeClass();

    coords.forEach(function (coord) {
      var tileNumber = (coord.i * this.board.dim) + coord.j;
      this.$li.eq(tileNumber).removeClass();
      this.$li.eq(tileNumber).addClass(className);
    }.bind(this));
  };

  View.prototype.setUpGrid = function () {
    var html = "<div class='game-window-container group'>";

    html += "<div class='game-window' >";

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

    html += (
      "<div class='game-start screen-text prompt-to-start'>" +
        "Press a Direction to Start<br>" +
      "</div>"
    );

    html += (
      "<div class='game-start screen-text instructions' >" +
        "Goal is to go for the High Score<br>" +
        "Collect the Orbs to Clean Up the Paint" +
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
      clearInterval(this.intervalId);
    } else {
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

    if (this.board.GameStatus.score > window.localStorage.highScore) {
      window.localStorage.highScore = this.board.GameStatus.score;
    }

    this.updateClasses(this.snake.segments, "snake");

    this.$el.one('click', function () {
      this.$el.empty();
      this.setUpGame(View.BOARD_DIM);
      $(".pause-prompt").toggleClass("text-off");
      $(window).on("keydown", this.startGame.bind(this));
    }.bind(this));
  };

  View.STEP_MILLIS = 20;
  View.MOVE_DELAY = 3;
  View.BOARD_DIM = 21;

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

  View.SNAKE_DIRECTION = {
    "N": "snake-head-north",
    "S": "snake-head-south",
    "E": "snake-head-east",
    "W": "snake-head-west",
  };

  // View.COLORS = [
  //   "red",
  //   "yellow",
  //   "blue",
  //   "green",
  //   "orange"
  // ];

}(this));
