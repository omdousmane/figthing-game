var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

let boss;
let platform;

function preload() {
  this.load.image("map", "./assets/background.png");
  this.load.image("ground", "./assets/platform.png");
  this.load.spritesheet("boss", "./assets/POSe_normal_BOSS.png", {
    frameWidth: 10,
    frameHeight: 20,
  });
}

function create() {
  this.add.image(400, 300, "map");

  platform = this.physics.add.staticGroup();
  platform.create(200, 585, "ground");
  platform.create(600, 585, "ground");

  boss = this.physics.add.sprite(100, 400, "boss");
}

function update() {}
