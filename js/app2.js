var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 1600
      },
      debug: true,
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
let isIdle = true;
let isAttacking = false;
let attIndex = 1;
let platform;
let bossCopy;
// chargement des assets
function preload() {
<<<<<<< HEAD
  this.load.image("map", "../assets/1.png");
=======
  this.load.image("map", "./assets/1.png");
>>>>>>> df1dc39a6ee68033e5e9e1840d2a2b797b71a763
  this.load.image("ground", "./assets/platform.png");
  this.load.spritesheet("boss", "./assets/sprites/test_samurai/Idle.png", {
    frameWidth: 200,
    frameHeight: 52,
  });
  this.load.spritesheet("boss_run", "./assets/sprites/test_samurai/Run.png", {
    frameWidth: 200,
    frameHeight: 48,
  });
  this.load.spritesheet(
    "boss_run_left",
<<<<<<< HEAD
    "./assets/sprites/test_samurai/RunLeft.png",
    {
=======
    "./assets/sprites/test_samurai/RunLeft.png", {
>>>>>>> df1dc39a6ee68033e5e9e1840d2a2b797b71a763
      frameWidth: 200,
      frameHeight: 48,
    }
  );
  this.load.spritesheet("boss_jump", "./assets/sprites/test_samurai/Jump.png", {
    frameWidth: 200,
    frameHeight: 200,
  });
  this.load.spritesheet(
    "boss_attack1",
<<<<<<< HEAD
    "./assets/sprites/test_samurai/Attack1.png",
    {
      frameWidth: 200,
      frameHeight: 69,
=======
    "./assets/sprites/test_samurai/Attack4.png", {
      frameWidth: 198,
      frameHeight: 66,
>>>>>>> df1dc39a6ee68033e5e9e1840d2a2b797b71a763
    }
  );
  this.load.spritesheet(
    "boss_attack2",
<<<<<<< HEAD
    "./assets/sprites/test_samurai/Attack2.png",
    {
=======
    "./assets/sprites/test_samurai/Attack2.png", {
>>>>>>> df1dc39a6ee68033e5e9e1840d2a2b797b71a763
      frameWidth: 200,
      frameHeight: 63,
    }
  );
}

// ajouts des assets de base à la création du jeu + physics
function create() {
  //le background
  this.add.image(400, 300, "map");

  // le sol
  platform = this.physics.add.staticGroup();
  platform.create(200, 585, "ground");
  platform.create(600, 585, "ground");
  platform.refresh();

  // testLifepoints = this.physics.add.sprite(300, 100, "boss");
  // testLifepoints.setCollideWorldBounds(true);

  // Le boss
  boss = this.physics.add.sprite(700, 100, "boss");
  boss.setScale(1.8);
  boss.body.setSize(40, 52, false);
  boss.setCollideWorldBounds(true);
<<<<<<< HEAD
  this.physics.add.collider(boss, platform, helloword);
  //this.physics.add.overlap(boss, platform, helloword)

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("boss", { start: 0, end: 7 }),
=======

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("boss", {
      start: 0,
      end: 7
    }),
>>>>>>> df1dc39a6ee68033e5e9e1840d2a2b797b71a763
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "run",
<<<<<<< HEAD
    frames: this.anims.generateFrameNumbers("boss_run", { start: 0, end: 7 }),
=======
    frames: this.anims.generateFrameNumbers("boss_run", {
      start: 0,
      end: 7
    }),
>>>>>>> df1dc39a6ee68033e5e9e1840d2a2b797b71a763
    frameRate: 30,
    repeat: -1,
  });

  this.anims.create({
    key: "run_left",
    frames: this.anims.generateFrameNumbers("boss_run_left", {
      start: 0,
      end: 7,
    }),
    frameRate: 30,
    repeat: -1,
  });

  this.anims.create({
    key: "jump",
<<<<<<< HEAD
    frames: this.anims.generateFrameNumbers("boss_jump", { start: 0, end: 1 }),
=======
    frames: this.anims.generateFrameNumbers("boss_jump", {
      start: 0,
      end: 1
    }),
>>>>>>> df1dc39a6ee68033e5e9e1840d2a2b797b71a763
    frameRate: 10,
    repeat: 1,
  });

  this.anims.create({
    key: "attack1",
    frames: this.anims.generateFrameNumbers("boss_attack1", {
      start: 0,
      end: 5,
    }),
<<<<<<< HEAD
    frameRate: 30,
    repeat: 1,
=======
    frameRate: 20,
>>>>>>> df1dc39a6ee68033e5e9e1840d2a2b797b71a763
  });
  this.anims.create({
    key: "attack2",
    frames: this.anims.generateFrameNumbers("boss_attack2", {
      start: 0,
      end: 5,
    }),
<<<<<<< HEAD
    frameRate: 30,
    repeat: 1,
=======
    frameRate: 20,
>>>>>>> df1dc39a6ee68033e5e9e1840d2a2b797b71a763
  });
  boss.setScale(2.8)
  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);




  this.physics.add.collider(boss, platform);

  //stats du boss
  // let stat = {
  //   pointsDeVie: 1000,
  //   AttaqueN1: 50,
  //   AttaqueN2: 75,
  // }
}
// tout ce qui est dynamique (score, click events, boss behavior (intelligence artificielle) etc...)
function update() {
  //click events pour bouger le perso
<<<<<<< HEAD
  if (cursors.left.isDown) {
    boss.setVelocityX(-400);
    boss.anims.play("run_left", true);
  } else if (cursors.right.isDown) {
    boss.setVelocityX(400);
    boss.anims.play("run", true);
  } else {
    boss.setVelocityX(0);
    boss.anims.play("idle", true);
  }
  if (cursors.up.isDown && boss.body.touching.down) {
    boss.setVelocityY(-530);
    boss.anims.play("run", false);
    boss.anims.play("jump", true);
  }
  // touches pour les attaques
  if (keyA.isDown) {
    boss.body.setSize(40, 69, false);
    boss.setVelocityX(0);
    boss.anims.play("attack1", true);
  } else if (keyZ.isDown) {
    boss.body.setSize(40, 63, false);
    boss.setVelocityX(0);
    boss.anims.play("attack2", true);
  } else {
    boss.body.setSize(40, 52, false);
  }
}

var v = 0;
function helloword() {
  document.querySelector("#msg").innerText = "contact" + v;
  document.querySelector("#msg").style.display = "block";
  v++;
}
=======
  //idle state
  if (isIdle) {
    if (cursors.left.isDown) {
      boss.setVelocityX(-400);
      boss.anims.play("run_left", true);
    } else if (cursors.right.isDown) {
      boss.setVelocityX(400);
      boss.anims.play("run", true);
    } else {
      boss.setVelocityX(0);
      boss.anims.play("idle", true);
      boss.body.setSize(40, 52, false);
    }

    if (cursors.up.isDown && boss.body.touching.down) {
      boss.setVelocityY(-630);
      boss.anims.play("jump", true);
      boss.anims.play("run", false);
    }

    // touches pour les attaques
    if (keyA.isDown) {
      isIdle = false;
      isAttacking = true;
      attIndex = 1;
      /*On utilise setSize pour customiser la hitBox*/
      boss.body.setSize(95, 52, false);
      /*On utilise setOrigine pour changer l'origine de notre personnage*/
      boss.setOrigin(0.489, 0.59);
      setCallback(attIndex);
    } else if (keyZ.isDown) {
      boss.body.setSize(95, 52, false);
      boss.setOrigin(0.489, 0.59);
      isIdle = false;
      isAttacking = true;
      attIndex = 2;

      setCallback(attIndex);
    }
  }

  // attacking state
  if (isAttacking) {
    boss.setVelocityX(0);
    boss.anims.play("attack" + attIndex, true);

  }
}

function resetIdleState() {
  console.log("test");
  boss.anims.play("idle", true);
  boss.setOrigin(0.5, 0.5);
  isAttacking = false;
  isIdle = true;
}

function setCallback(attIndex) {
  boss.removeListener("animationcomplete");
  // boss.body.setSize(40, 78, false);
  // boss.body.anchor.y += 15;
  boss.anims.play("attack" + attIndex, true);
  boss.on("animationcomplete", resetIdleState);
}
>>>>>>> df1dc39a6ee68033e5e9e1840d2a2b797b71a763
