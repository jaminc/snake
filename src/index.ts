import View from "./js/view";

import "./scss/main.scss";

const start = () => {
  new View(document.querySelector(".snake-game"));
};

start();
