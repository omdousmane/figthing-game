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

//déclaration des variables
let boss;
let platform;

// chargement des assets
function preload() {
  this.load.image("map", "./assets/background.png");
  this.load.image("ground", "./assets/platform.png");
  this.load.spritesheet("boss", "./assets/sprites/test_samurai/Idle.png", {
    frameWidth: 200,
    frameHeight: 200,
  });
  this.load.spritesheet("boss_run", "./assets/sprites/test_samurai/Run.png", {
    frameWidth: 200,
    frameHeight: 200,
  });
  this.load.spritesheet("boss_jump", "./assets/sprites/test_samurai/Jump.png", {
    frameWidth: 200,
    frameHeight: 200,
  });
}

// ajouts des assets de base à la création du jeu + physics
function create() {
  //le background
  this.add.image(400, 300, "map");

  // le sol
  platform = this.physics.add.staticGroup();
  platform.create(200, 585, "ground");
  platform.create(600, 585, "ground");

  // Le boss
  boss = this.physics.add.sprite(400, 300, "boss");
  boss.setScale(1.5);
  boss.setCollideWorldBounds(true);
  this.physics.add.collider(boss, platform);

  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('boss_run', { start: 0, end: 7 }),
    frameRate: 20,
    repeat: -1
  });

  this.anims.create({
    key:'jump',
    frames: this.anims.generateFrameNumbers('boss_jump', {start: 0, end: 1}),
    frameRate: 10,
    repeat: -1
  });

  // boss.play("idle");

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();
}
// tout ce qui est dynamique (score, click events, boss behavior (intelligence artificielle) etc...)
function update() {
  //click events pour bouger le perso
  if (cursors.left.isDown)
  {
      boss.flipX=true;
      boss.setVelocityX(-190);
      boss.anims.play('run', true);
  }
  else if (cursors.right.isDown)
  {
      boss.setVelocityX(190);
      boss.anims.play('run', true);
      if (boss.flipX){
        boss.flipX=false;
      }
  }
  else
  {
      boss.setVelocityX(0);
      boss.anims.play('idle', true);
  }
  if (cursors.up.isDown && boss.body.touching.down)
  {
      boss.setVelocityY(-330);
      boss.anims.play('jump', true);
      boss.anims.play('run', false);
  }
}
