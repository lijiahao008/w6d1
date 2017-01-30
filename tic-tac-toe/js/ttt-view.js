class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "li", (e) => {
      const $square = $(e.currentTarget);
      this.makeMove($square);
    });
  }

  makeMove($square) {
    // const posArr = [parseInt($square.data("pos")[0]),parseInt($square.data("pos")[2])];
    this.game.playMove($square.data("pos"));
    $square.text(`${this.game.currentPlayer}`).addClass("playerMark");
    // debugger
    if (this.game.isOver()) {
      alert(`The game is over.`);
      }
  }

  setupBoard() {
    this.$el.on("mouseenter", "li", (e) => {
      const $square = $(e.currentTarget);
      $square.toggleClass("selected");
    });
    this.$el.on("mouseleave", "li", (e) => {
      const $square = $(e.currentTarget);
      $square.toggleClass("selected");
    });


    const $ul = $("<ul>").addClass("board");
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        const $square = $("<li>").data("pos", [rowIndex, colIndex]);
        $square.addClass("tile");
        $ul.append($square);
      }
    }
    this.$el.append($ul);
  }
}

module.exports = View;
