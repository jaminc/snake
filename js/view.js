(function(root) {

  if (typeof SG === "undefined") {
    root.SG = {};
  }

  var View = SG.View = function ($el) {
    this.$el = $el;

    this.board = new SG.Board(20);
    this.snake = this.board.snake;
    this.setUpGrid();
    this.render();

    // this.intervalId = window.setInterval(
    //   this.step.bind(this),
    //   View.STEP_MILLIS
    // );

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.STEP_MILLIS = 1000;

  View.prototype.handleKeyEvent = function (event) {
    var keyCode = event.keyCode;

    if (View.KEYS[keyCode]) {
      this.board.snake.turn(View.KEYS[keyCode]);
      this.board.snake.move();
      this.render();
    }
  };

  View.prototype.render = function () {
    this.updateClasses(this.board.snake.segments, "snake");
    
    // this.updateClasses([this.board.apple.position], "apple");
  };

  View.prototype.setUpGrid = function () {
    var html = "";

    for (var i = 0; i < this.board.dim; i++) {
      html += "<ul class='row group'>";
      for (var j = 0; j < this.board.dim; j++) {
        html += "<li class='row-tile' ></li>";
      }
      html += "</ul>"
    }

    this.$el.html(html);
    this.$li = this.$el.find("li");
  };

  View.prototype.updateClasses = function (coords, className) {
    this.$li.filter("." + className).removeClass();

    coords.forEach(function (coord) {
      var tileNumber = (coord.i * this.board.dim) + coord.j;
      this.$li.eq(tileNumber).addClass(className);
    }.bind(this));
  };

  View.prototype.step = function () {
    if ( this.snake.segments.length > 0) {
      this.snake.move();
      this.render();
    } else {
      alert("You lose!");
      window.clearInterval(this.intervalId);
    }
  };

}(this));
