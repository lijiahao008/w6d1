
class View {
  constructor(game, $el){
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.selectedTower = null;
    this.render();

  }

  setupTowers(){
    let disksClasses = ["disk-1", "disk-2", "disk-3"];
    for (let column = 0; column < 3; column++) {
      const $ul = $("<ul>").addClass("tower").attr("tower", column);
      this.$el.append($ul);
    }
    let $towerOne = $("[tower='0']");
    for (let disk = 0; disk < 3; disk++) {
      const $disk = $("<li><img src='./css/dogebread.png'/></li>").attr("disk", disk);
      $disk.addClass(`${disksClasses[disk]}`);
      $towerOne.append($disk);
    }
  }

  clickTower ($tower) {
    if (this.selectedTower === null) {
      this.selectedTower = parseInt($tower.attr("tower"));
      $tower.toggleClass("selected");
    }
    else {
      let targetTower = parseInt($tower.attr("tower"));
      let $selectedTower = $(`[tower='${this.selectedTower}']`);
      if (this.game.move(this.selectedTower, targetTower)) {
        $tower.prepend($selectedTower.children()[0]);
      } else {
        alert("wrong dogebread");
      }
      this.selectedTower = null;
      $selectedTower.toggleClass("selected");
    }
  }

  render () {
    this.$el.on("click", "ul", (e) => {
      const $tower = $(e.currentTarget);
      this.clickTower($tower);
      if (this.game.isWon()) {
        alert("you got doged!!!!!");
      }
    });
  }
}



module.exports = View;
