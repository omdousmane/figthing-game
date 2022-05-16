kaboom({
    width: 800,
    height: 600,
    font: "sinko",
    background: [ 0, 0, 5,0.2 ],
})
const SPEED = 170
const JUMP_FORCE = 240
gravity(640)

let bgImage = loadSprite("background", "../assets/1.png");
let background = add([
  sprite("background"),
  // Make the background centered on the screen
  pos(width() / 2, height() / 2),
  origin("center"),
  // Allow the background to be scaled
  scale(1),
  // Keep the background position fixed even when the camera moves
  fixed()
]);








// Loading a multi-frame sprite
loadSprite("persoIdle", "../assets/sprites/test_samurai/Idle.png", {
	// The image contains 9 frames layed out horizontally, slice it into individual frames
	sliceX: 8,
    
	// Define animations
	anims: {
		"idle": {
			// Starts from frame 0, ends at frame 3
			from: 0,
			to: 7,
			// Frame per second
			speed: 10,
			loop: true,
		},
		
	},
})



loadSprite("persoRun","../assets/sprites/test_samurai/Run.png", {
	// The image contains 9 frames layed out horizontally, slice it into individual frames
	sliceX: 8,
	// Define animations
	anims: {
		"run": {
			from: 0,
			to: 7,
			speed: 20,
			loop: true,
		}
	},
})

loadSprite("persoRunLeft","../assets/sprites/test_samurai/RunLeft.png", {
	// The image contains 9 frames layed out horizontally, slice it into individual frames
	sliceX: 8,
	// Define animations
	anims: {
		"runLeft": {
			from: 0,
			to: 7,
			speed: 20,
			loop: true,
		}
	},
})

loadSprite("persoAttack1","../assets/sprites/test_samurai/Attack1.png", {
	// The image contains 9 frames layed out horizontally, slice it into individual frames
	sliceX: 6,
	// Define animations
	anims: {
		"Attack1": {
			from: 0,
			to: 5,
			speed: 30,
			loop: false,
		}
	},
})


loadSprite("persoJump", "../assets/sprites/test_samurai/Jump1.png", {
	// The image contains 9 frames layed out horizontally, slice it into individual frames
	sliceX: 2,
	// Define animations
	anims: {
		
		"jump": {
			from: 0,
			to: 1,
			speed: 5,
			loop: true,
		}
	},
})


// Add our pTest character
const pTest = add([
	sprite("persoIdle"),
    area({ width: 40, height: 52 }),
	pos(150, 32),
	origin("left"),
    scale(3),
	
	body(),
])
pTest.play("idle")


const enemy = add([
	sprite("persoIdle"),
    area({ width: 40, height: 52 }),
	pos(550, 32),
	origin("left"),
    scale(3),
	body(),
    // This enemy cycle between 3 states, and start from "idle" state
	state("move", [ "idle", "attack", "move", ]),
])
pTest.play("idle")
enemy.enterState("attack");

//add the ground
const sol=add([
    pos(0, 580),
    rect(850, 20),
    outline(4),
    color(95, 124, 45),
    area(),
    solid(),
])



//console.log(pTest);

let persoPrincipale=new player(100,10,20)



onKeyDown("left", () => {
    console.table(pTest.origin);
    // Regler la position
	pTest.move(-SPEED, 0);
	// pTest.flipX(true);
	// .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
	if (pTest.isGrounded() && pTest.curAnim() !== "run") {
        // pTest.origin = "right";
        // pTest.origin = {
        //     x: pTest.pos.x - pTest.area.width,
        //     y: pTest.pos.y
        // }
        pTest.use(sprite("persoRunLeft"));
		pTest.play("runLeft");
	}
})

onKeyDown("right", () => {
    console.log("right")
	pTest.move(SPEED, 0)
	pTest.flipX(false)
	if (pTest.isGrounded() && pTest.curAnim() !== "run") {
        pTest.use(sprite("persoRun"));
		pTest.play("run");
	}
})

pTest.onGround(() => {
	if (!isKeyDown("left") && !isKeyDown("right")) {
        pTest.use(sprite("persoIdle"));
		pTest.play("idle");
	} else {
        pTest.use(sprite("persoRun"));
		pTest.play("run");
	}
})

onKeyRelease(["left", "right"], () => {
	// Only reset to "idle" if pTest is not holding any of these keys
	if (pTest.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
        // pTest.origin = "left";
		pTest.use(sprite("persoIdle"));
        pTest.play("idle");
	}
})


// les attaques
onKeyDown("a", () => {
	if (pTest.isGrounded() && pTest.curAnim() !== "run") {
        console.log("Attack 1")
        pTest.origin = "botleft"
        pTest.use(sprite("persoAttack1"));
		pTest.play("Attack1");
	}
})

pTest.onAnimEnd("Attack1", () => {
    pTest.use(sprite("persoIdle"));
    pTest.play("idle");
})



enemy.play("idle");

// Run the callback once every time we enter "idle" state.
// Here we stay "idle" for 0.5 second, then enter "attack" state.
// enemy.onStateEnter("idle", async () => {
//     console.log("startIdle");
//     if (enemy.isGrounded() && enemy.curAnim() !== "idle") {
//         enemy.use(sprite("persoIdle"));
//         enemy.play("idle");
//         console.log("idleEnemy");
//     }
//     await wait (2);
//     console.log("idleEnemy");
// 	enemy.enterState("move");
// })

// enemy.onStateEnter("move", () => {
//     if (pTest.exists()) {
//         console.log("moveEnemy");
//         // c'est le vecteur de direction vers le joueur
//         let direction = pTest.pos.x - enemy.pos.x;
    
//         // ennemi attaque quand il est proche
//         while (Math.abs(direction) > 40) {
//             if (direction < 0) {
//                 enemy.move(-SPEED, 0);
//                 enemy.flipX(true);
//                 if (enemy.isGrounded() && enemy.curAnim() !== "runLeft") {
//                     enemy.use(sprite("persoRunLeft"));
//                     enemy.play("runLeft");
//                     console.log("leftEnemy");
//                 }
//             } else if (direction > 0) {
//                 enemy.move(SPEED, 0);
//                 enemy.flipX(false);
//                 if (enemy.isGrounded() && enemy.curAnim() !== "run") {
//                     enemy.use(sprite("persoRun"));
//                     enemy.play("run");
//                     console.log("rightEnemy")
//                 }
//             }
//         }
//         enemy.enterState("attack");
    
//         }
// })


// // When we enter "attack" state, we fire a bullet, and enter "move" state after 1 sec
// enemy.onStateEnter("attack", () => {

// 	// Don't do anything if pTest doesn't exist anymore
// 	if (pTest.exists()) {

//     // c'est le vecteur de direction vers le joueur
//     let direction = pTest.pos.x - enemy.pos.x;

//     // ennemi attaque quand il est proche
//     while (direction > 40) {
//         console.log("Attack 1")
//         enemy.origin = "botleft"
//         enemy.use(sprite("persoAttack1"));
// 		enemy.play("Attack1");
//         console.log("attackEnemy")
//     }

//     //quand la cible s'éloigne on recommence à bouger
//     enemy.enterState("idle");

//     }

// });


debug.inspect = true
debug.showLog = true
add([
    text("hello"),
    pos(120, 80),
]);