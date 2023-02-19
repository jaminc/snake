import Coord from "./coord";
import Board from "./board";
import Snake, { Direction } from "./snake";

const STEP_MILLIS = 20;
const MOVE_DELAY = 3;
const BOARD_DIM = 21;
const COLORS = ["#00897B", "#0277BD", "#512DA8", "#C62828"];
const KEYS: { [key: number]: Direction } = {
  38: Direction.N,
  39: Direction.E,
  40: Direction.S,
  37: Direction.W,
  87: Direction.N,
  68: Direction.E,
  83: Direction.S,
  65: Direction.W,
  73: Direction.N,
  76: Direction.E,
  75: Direction.S,
  74: Direction.W,
};

class View {
  board: Board;
  snake: Snake;
  moveDelay: number;
  gamePaused: boolean;
  intervalId: number;
  $el: HTMLElement;
  $li: NodeListOf<Element>;
  keydownCallback: (event: any) => void;

  constructor($el: HTMLElement) {
    this.changePageBackgroundColor();

    if (typeof window.localStorage.highScore === "undefined") {
      window.localStorage.highScore = 0;
    }

    this.$el = $el;
    this.setUpGame(BOARD_DIM);

    // this.keydownCallback = this.startGame.bind(this)
    this.keydownCallback = (event: any) => this.startGame(event);
    // window.addEventListener("keydown", this.keydownCallback);
    window.addEventListener("keydown", this.keydownCallback);
  }

  setUpGame(dim: number) {
    this.board = new Board(dim);
    this.snake = this.board.snake;
    this.snake.colorTimer = 0;

    this.moveDelay = MOVE_DELAY;
    this.gamePaused = false;

    this.setUpGrid();
    this.render();
  }

  selectRandomColor() {
    const idx = Math.floor(Math.random() * COLORS.length);

    return COLORS[idx];
  }

  startGame(event: any) {
    const keyCode: number = event.keyCode;

    if (KEYS[keyCode]) {
      this.snake.dir = KEYS[keyCode];
      document
        .querySelectorAll(".game-start")
        .forEach((el) => el.classList.toggle("text-off"));

      window.removeEventListener("keydown", this.keydownCallback);

      this.keydownCallback = this.handleKeyEvent.bind(this);

      window.addEventListener("keydown", this.keydownCallback);

      this.intervalId = window.setInterval(this.step.bind(this), STEP_MILLIS);
    }
  }

  handleKeyEvent(event: any) {
    const keyCode = event.keyCode;

    if (KEYS[keyCode]) {
      this.snake.turn(KEYS[keyCode]);
    } else if (keyCode === 80) {
      this.toggleGamePaused();
    }
  }

  render() {
    const snakeSegments = this.snake.segments.slice(
      0,
      this.snake.segments.length
    );

    const currentSegments = snakeSegments.slice(
      0,
      this.snake.transitionSegment
    );
    const reverseSegments = snakeSegments
      .reverse()
      .slice(0, this.snake.transitionSegment);

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

      reverseSegments.forEach((coord) => {
        const tileNumber = coord.i * this.board.dim + coord.j;

        this.$li[tileNumber].removeAttribute("class");
        this.$li[tileNumber].classList.add("row-tile", "white-snake");

        // console.log(color);
        // this.$li.eq(tileNumber).css("background", this.snake.randomColor);
      });

      // this.updateClasses(reverseSegments, "white-snake");
    }

    if (this.snake.colorTimer > 0) {
      this.snake.transitionSegment += 1;
      this.updateClasses(currentSegments, "snake");
    }

    this.updateClasses([this.snake.head()], "snake-head");

    document.querySelector(".score").textContent =
      "Score: " + this.board.gameStatus.score;
    document.querySelector(".high-score").textContent =
      "High Score: " + window.localStorage.highScore;

    if (this.snake.colorTimer <= 0) {
      // $(".color-timer").text("Clean Mode Timer: 0");
    } else {
      const time = Math.floor(this.snake.colorTimer / 100);
      let displayTime;

      if (time < 10) {
        displayTime = "0" + time;
      } else if (time < 100) {
        displayTime = " " + time;
      } else {
        displayTime = time;
      }

      document.querySelector(".color-timer").textContent =
        "Clean Meter: " + displayTime;
    }
  }

  step() {
    if (this.board.gameOver) {
      this.gameOver();
    } else {
      if (this.moveDelay <= 0) {
        this.moveDelay = MOVE_DELAY;
        this.snake.move();
        this.render();
      } else {
        this.render();
        this.moveDelay -= 1;
      }

      this.snake.colorTimer -= STEP_MILLIS;
    }
  }

  updateClasses(coords: Array<Coord>, className: string) {
    document
      .querySelectorAll(`.${className}`)
      .forEach((el) => el.removeAttribute("class"));

    coords.forEach((coord) => {
      const tileNumber = coord.i * this.board.dim + coord.j;
      this.$li[tileNumber].classList.add(className);
    });
  }

  setUpGrid() {
    let html = "<div class='game-window-container group'>";

    html += "<div class='game-window' >";

    for (let i = 0; i < this.board.dim; i++) {
      html += "<ul class='row group'>";
      for (let j = 0; j < this.board.dim; j++) {
        html += "<li class='row-tile'></li>";
      }
      html += "</ul>";
    }

    html += "</div>";

    html +=
      "<div class='game-paused screen-text text-off'>" +
      "GAME PAUSED<br>" +
      "Press P to Resume" +
      "</div>";

    html +=
      "<div class='game-over screen-text text-off'>" +
      "GAME OVER<br>" +
      "Press Any Key to Restart" +
      "</div>";

    html +=
      "<div class='game-start screen-text prompt-to-start'>" +
      "Press a Direction to Start<br>" +
      "</div>";

    html +=
      "<div class='game-start screen-text instructions' >" +
      "The goal is to go for the high score<br>" +
      "Collect the Orbs to Clean Up the Paint" +
      "</div>";

    html += "</div>";

    this.$el.innerHTML = html;
    this.$li = document.querySelectorAll(".row-tile");
  }

  toggleGamePaused() {
    this.gamePaused = !this.gamePaused;
    document.querySelector(".game-paused").classList.toggle("text-off");
    document.querySelector(".pause-prompt")?.classList.toggle("text-off");

    if (this.gamePaused) {
      clearInterval(this.intervalId);
    } else {
      this.intervalId = window.setInterval(this.step.bind(this), STEP_MILLIS);
    }
  }

  gameOver() {
    clearInterval(this.intervalId);
    document.querySelector(".pause-prompt")?.classList.toggle("text-off");
    document.querySelector(".game-over").classList.toggle("text-off");
    // $(window).off("keydown");
    window.removeEventListener("keydown", this.keydownCallback);

    if (this.board.gameStatus.score > window.localStorage.highScore) {
      window.localStorage.highScore = this.board.gameStatus.score;
    }

    this.updateClasses(this.snake.segments, "snake");
    // this.$el.one('click', function () {

    const newGameCallback = () => {
      // this.$el.empty();
      console.error("ISJDFOFISDJOIDI");

      this.setUpGame(BOARD_DIM);

      document.querySelector(".pause-prompt")?.classList.toggle("text-off");

      window.removeEventListener("keydown", newGameCallback);

      this.keydownCallback = this.startGame.bind(this);
      window.addEventListener("keydown", this.keydownCallback);
      return {};
    };
    setTimeout(() => {
      console.error("VJOISDGOJFSIOGIOSFIOO");

      window.addEventListener(
        "keydown",
        // () => console.error('EWRUYEWIRUEIWYRIUIUYRI')
        newGameCallback
      );
    }, 1000);
  }

  changePageBackgroundColor() {
    const color = this.selectRandomColor();

    document.querySelector("html").style.background = color;
  }
}

export default View;
