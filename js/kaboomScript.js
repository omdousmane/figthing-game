kaboom({
    width: 800,
    height: 600,
    font: "sinko",
    background: [0, 0, 5, 0.2],
})
var mapBg="3.png";
const SPEED = 300
const JUMP_FORCE = 1000
gravity(1550)

let bgImage = loadSprite("background", "./assets/"+mapBg);
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
loadSprite("persoIdle", "./assets/sprites/test_samurai/Idle.png", {
    // The image contains 9 frames layed out horizontally, slice it into individual frames
    sliceX: 8,

    // Define animations
    anims: {
        "idle": {
            // Starts from frame 0, ends at frame 3
            from: 0,
            to: 7,
            // Frame per second
            speed: 5,
            loop: true,
        },

    },
})



loadSprite("persoRun", "./assets/sprites/test_samurai/Run.png", {
    // The image contains 9 frames layed out horizontally, slice it into individual frames
    sliceX: 8,
    // Define animations
    anims: {

        "run": {
            from: 0,
            to: 7,
            speed: 10,
            loop: true,
        }
    },
})

loadSprite("persoRunLeft", "./assets/sprites/test_samurai/RunLeft.png", {
    // The image contains 9 frames layed out horizontally, slice it into individual frames
    sliceX: 8,
    // Define animations
    anims: {

        "runLeft": {
            from: 0,
            to: 7,
            speed: 10,
            loop: true,
        }
    },
})


loadSprite("attack2", "./assets/sprites/test_samurai/Attack2.png", {
    // The image contains 9 frames layed out horizontally, slice it into individual frames
    sliceX: 6,
    // Define animations
    anims: {

        "attack2": {
            from: 2,
            to: 5,
            speed: 35,
            loop: false,
        }
    },
})

loadSprite("attack2Left", "./assets/sprites/test_samurai/Attack2Left.png", {
    // The image contains 9 frames layed out horizontally, slice it into individual frames
    sliceX: 6,
    // Define animations
    anims: {

        "attack2Left": {
            from: 2,
            to: 5,
            speed: 35,
            loop: false,
        }
    },
})


loadSprite("persoJump", "./assets/sprites/test_samurai/jump1.png", {
    // The image contains 9 frames layed out horizontally, slice it into individual frames
    sliceX: 8,
    // Define animations
    anims: {

        "jump": {
            from: 0,
            to: 1,
            speed: 10,
            loop: true,
        }
    },
})


// loadSprite("persoJump", "../assets/sprites/test_samurai/Jump1.png", {
// 	// The image contains 9 frames layed out horizontally, slice it into individual frames
// 	sliceX: 8,
// 	// Define animations
// 	anims: {

// 		"jump": {
// 			from: 0,
// 			to: 1,
// 			speed: 5,
// 			loop: true,
// 		}
// 	},
// })


// Add our player character
const p = add([
    sprite("persoIdle"),
    area({
        width: 36,
        height: 49.5
    }),
    pos(),
    origin("left"),
    scale(2.5),
    outline(0),
    body(),
])

const sol = add([
    pos(0, 580),
    rect(1550, 20),
    outline(0),
    area(),
    solid(),

])



p.play("idle")

const box1 = add([
    pos(850, 10),
    rect(20, 850),
    outline(0),
    area(),

    origin("center"),
    solid(),
])
const box = add([
    pos(-18, 10),
    rect(20, 850),
    outline(0),
    area(),

    origin("center"),
    solid(),
])
const enemy = add([
    pos(480, 400),
    rect(50, 50),
    outline(0),
    area(),

    origin("center"),
    solid(),
    "enemy",
])
destroy(enemy)








const enemy2 = add([
	sprite("persoIdle"),
    area({ width: 40, height: 52 }),
	pos(550, 32),
	origin("left"),
    scale(2.5),
	body(),
    // This enemy cycle between 3 states, and start from "idle" state
	state("idle", [ "idle", "attack", "move" ])
])

enemy2.play("idle")


/*IA*/
// this callback will run once when enters "attack" state
enemy2.onStateEnter("attack", () => {
    const dir = p.pos.sub(enemy2.pos).unit();
    // enter "idle" state when the attack animation ends
    if (dir.x < 0) {
        enemy2.origin = "botleft";
        enemy2.use(sprite("attack2Left"));
        p.area.width = 55
        enemy2.play("attack2Left", {
            // any additional arguments will be passed into the onStateEnter() callback
            onEnd: () => enemy2.enterState("idle", rand(0.5, 1.5)),
        })
    }

    if (dir.x > 0) {
        enemy2.origin = "botleft";
        enemy2.use(sprite("attack2"));
        p.area.width = 55
        enemy2.play("attack2", {
            // any additional arguments will be passed into the onStateEnter() callback
            onEnd: () => enemy2.enterState("idle", rand(0.5, 1.5)),
        })
    }

    // checkHit(enemy2, p)
})

// this will run once when enters "idle" state
enemy2.onStateEnter("idle", () => {
    enemy2.use(sprite("persoIdle"));
    enemy2.play("idle");
    wait(1, () => enemy2.enterState("move"))
})

// this will run every frame when current state is "move"
enemy2.onStateUpdate("move", () => {
    const dir = p.pos.sub(enemy2.pos).unit();
    if (p.isGrounded()) {
        enemy2.move(dir.scale(100));
		if (dir.x < 0 && enemy2.curAnim() !== "runLeft") {
			enemy2.use(sprite("persoRunLeft"));
			enemy2.play("runLeft", {
                loop: false
            });
			console.log("left");
		} else if (dir.x > 0 && enemy2.curAnim() !== "run") {
			enemy2.use(sprite("persoRun"));
			enemy2.play("run", {
                loop: false
            });
			console.log("right");
		}
        if (enemy2.pos.dist(p.pos) < 150) {
            enemy2.enterState("attack");
        }
    }

})

setTimeout( function() {
    enemy2.enterState("idle");
}, 2000)


/* FIN IA*/

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

















onKeyPress("a", () => {


    // .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
    if (p.isGrounded() && p.curAnim() !== "run") {
        p.use(sprite("attack2"))
        p.area.width = 55
      //  console.table(p.area.height)
        p.play("attack2")

    }
})



/*COLLISION*/


const barreVie = add([
    pos(50, 100),
    rect(500, 50),
    outline(0),
    origin("left"),

])

const vie = add([
    text("100", {
        size: 28, // 48 pixels tall
        width: 320, // it'll wrap to next line when width exceeds this value
        font: "sink", // there're 4 built-in fonts: "apl386", "apl386o", "sink", and "sinko"

    }),

    pos(80, 86),
    color(rgb(127, 79, 255)),

]);
const degat = add([
    text("", {
        size: 48, // 48 pixels tall
        width: 320, // it'll wrap to next line when width exceeds this value
        font: "sink", // there're 4 built-in fonts: "apl386", "apl386o", "sink", and "sinko"
    }),
    {
        anim: "burst",
    },
    origin("center"),
    scale(),

    pos(enemy.pos),
    {
        value: 0
    },

])

degat.scale = 0.0085
degat.opacity = 0

// p.onCollide("enemy", (enemy) => {
//     if(isKeyDown("a") && !isKeyDown("right")){
//         destroy(enemy)

//         addDegat(enemy.pos,"100")
//     }

// })

const total = 500;
let solved = 1;
const ruleOfThree = (num1, num2) => {
    const proportion = (num2 * 100) / num1;
    return Math.round(proportion * 10) / 10;
};

const updateBarLength = () => {
    const percentage = ruleOfThree(total, solved);
    barreVie.width = percentage ;
    console.log(percentage)
};



p.onCollide("enemy", (enemy) => {


    if (isKeyDown("a") && !isKeyDown("right")) {
        if (vie.text > 1) {
            vie.text -= 10

          
                updateBarLength();
               
            

        } else if (vie.text < 1) {
            destroy(p)
        }
        //destroy(enemy)

        takeDegat(enemy.pos, "10")
    }

})

function takeDegat(position, dammage) {
    barreVie.text = dammage
    barreVie.onUpdate(() => {
        barreVie.scale += 0.0085
        barreVie.opacity += 0.5

    })


}


function takeDegat(position, dammage) {
    degat.text = dammage
    degat.onUpdate(() => {
        degat.scale += 0.0085
        degat.opacity += 0.5

    })
    setTimeout(() => {


        destroy(degat)
    }, 400)

}











/* ****************** */

p.onAnimEnd("attack2", () => {
    p.area.width = 40
    p.use(sprite("persoIdle"));
    p.play("idle");
})




onKeyDown("left", () => {
    p.move(-SPEED, 0)

    // .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
    if (p.isGrounded() && p.curAnim() == "idle" && !isKeyDown("right") || p.isGrounded() && p.curAnim() == "run") {
        console.log(p.curAnim())
        p.area.width = 36

        //console.table(p)

        p.use(sprite("persoRunLeft"))
        p.play("runLeft")


    }
})



onKeyDown("right", () => {
    p.move(+SPEED, 0)

    // .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
    if (p.isGrounded() && p.curAnim() == "idle" && !isKeyDown("left")) {
        p.use(sprite("persoRun"))
        p.area.width = 36
        // console.table( p.area())
        p.play("run")
    }
})


onKeyRelease(["left", "right", "a"], () => {
    // Only reset to "idle" if player is not holding any of these keys
    if (p.isGrounded() && !isKeyDown("left") && !isKeyDown("right")) {
        p.use(sprite("persoIdle"))
        p.play("idle")
    }

    if (!isKeyDown("a") || isKeyDown("left")) {
        p.area.width = 36
    }
})

onKeyPress(["space", "up"], () => {
    // .move() is provided by pos() component, move by pixels per second
    if (p.isGrounded()) {
        p.use(sprite("persoJump"))
        p.play("jump")
        p.jump(JUMP_FORCE)


    }

})
onKeyRelease(["space", "up"], () => {
    p.use(sprite("persoIdle"))
    p.play("idle")

})
let persoPrincipale = new player(100, 10, 20)




debug.inspect = true