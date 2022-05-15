kaboom({
    width: 800,
    height: 600,
    font: "sinko",
    background: [0, 0, 5, 0.2],
})
var dataStat;
var mapBg = "3.png";
var timer = 0;
var score;
var idU = sessionStorage.idUser
const SPEED = 300
const JUMP_FORCE = 800
gravity(1550)
var isend = false

/*ON DECLARE NOTRE JOUEUR ET LE BOSS*/
var joueur = new player(100, 0.005)
var adversaire = new player(100, 0.00000002)
let mapSound = loadSound("map1Sound", "../assets/sounds/1.mp3")
let kickSound = loadSound("kickSound", "../assets/sounds/impactSound.mp3")
let bgImage = loadSprite("background", "./assets/" + mapBg);

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

const music = play("map1Sound", {
    volume: 0.2,
    loop: true
})
const kick = play("kickSound", {
    volume: 0.3,
    loop: false
})

// using the handle to control (check out AudioPlay for more controls / info)
music.pause()

music.play()























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
            from: 7,
            to: 0,
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
            from: 0,
            to: 5,
            speed: 85,
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
            from: 0,
            to: 5,
            speed: 25,
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


// Add our player character
const p = add([
    sprite("persoIdle"),
    area({
        width: 25,
        height: 49.5
    }),
    pos(50, 10),
    origin("botleft"),
    scale(2.5),
    outline(0),
    body(),
    rotate(),
    "p",
])

const sol = add([
    pos(0, 580),
    rect(1550, 20),
    outline(0),
    area(),
    solid(),
    "sol"
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
const boxCollisionLeft = add([
    pos(-22, 220),
    rect(35, 850),
    outline(0),
    area(),

    origin("center"),
    solid(),
])
const boxCollisionRight = add([
    pos(822, 220),
    rect(35, 850),
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
    sprite("persoIdle", {
        flipX: true
    }),
    area({
        width: 25,
        height: 49.5
    }),
    pos(750, 32),
    origin("botright"),
    scale(2.5),
    body(),
    // This enemy cycle between 3 states, and start from "idle" state
    state("idle", ["idle", "attack", "move"]),
    "enemy2",
    rotate(),

])

enemy2.play("idle")


/*IA*/
// this callback will run once when enters "attack" state
enemy2.onStateEnter("attack", () => {
    const dir = p.pos.sub(enemy2.pos).unit();
    // enter "idle" state when the attack animation ends
    // ennemi attaque joueur venant de la gauche
    if (dir.x < 0) {
        enemy2.origin = "botright";
        if (getRandomInt(1, 3) == 1) {

            kick.play()
            enemy2.use(sprite("attack2Left"));
            enemy2.area.width = 55
            //console.log("attack");
            enemy2.play("attack2Left", {
                // any additional arguments will be passed into the onStateEnter() callback
                onEnd: () => enemy2.enterState("idle", rand(0.5, 1.5)),
            })
        } else {
            enemy2.onUpdate(() => {
                enemy2.move(+5)
            })
            enemy2.enterState("idle", rand(0.5, 1.5));
        }
    }
    //ennemi attaque joueur venant de la droite
    if (dir.x > 0) {
        enemy2.origin = "botleft";
        if (getRandomInt(1, 3) == 1) {
            // perf - console.log(adversaire.attack(joueur))
            enemy2.use(sprite("attack2"));
            enemy2.area.width = 55
            //console.log("attack");
            enemy2.play("attack2", {
                // any additional arguments will be passed into the onStateEnter() callback
                onEnd: () => enemy2.enterState("idle", rand(0.5, 1.5)),
            })
        } else {
            enemy2.onUpdate(() => {
                enemy2.move(+2)
            })
            enemy2.enterState("idle", rand(0.5, 1.5));
        }
    }
})

// this will run once when enters "idle" state
enemy2.onStateEnter("idle", () => {
    enemy2.area.width = 25
    const dir = p.pos.sub(enemy2.pos).unit();
    if (enemy2.curAnim() !== "idle" && dir.x > 0) {
        kick.stop()
        enemy2.origin = "botleft";
        enemy2.use(sprite("persoIdle"));
        enemy2.play("idle");
    } else {
        enemy2.origin = "botright";
        enemy2.use(sprite("persoIdle", { flipX: true }));
        enemy2.play("idle");
    }
    if (p.exists()) {
        wait(1, () => enemy2.enterState("move"));
    }
})

// this will run every frame when current state is "move"
enemy2.onStateUpdate("move", () => {
    const dir = p.pos.sub(enemy2.pos).unit();
    //console.log("enter move state");
    if (p.isGrounded()) {
        enemy2.move(dir.scale(100));
        //console.log("is actually moving");
        if (dir.x < 0 && enemy2.curAnim() !== "runLeft") {
            enemy2.origin = "botleft";
            enemy2.use(sprite("persoRunLeft"));
            enemy2.play("runLeft");
            //console.log("left");
        } else if (dir.x > 0 && enemy2.curAnim() !== "run") {
            enemy2.use(sprite("persoRun"));
            enemy2.origin = "botleft";
            enemy2.play("run");
            //console.log("right");
        }
        if (enemy2.pos.dist(p.pos) < 220) {
            enemy2.enterState("attack");
        }
    }

})

// appuie sur enter pour commencer le combat
onKeyPress("enter", () => enemy2.enterState("idle"));


/* FIN IA*/

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}





















// PLAYER ATTACK TOUCH EVENT + ANIMATION
let attackTurn = false;
onKeyPress("a", () => {


    // .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
    if (p.isGrounded() && !attackTurn) { 
        kick.play()
        p.origin = "botleft";
        p.use(sprite("attack2"))
        p.play("attack2")
        p.area.width = 65
        //  console.table(p.area.height)
    }
    if (p.isGrounded() && attackTurn) {
        p.origin = "botright";
        p.use(sprite("attack2Left"))
        p.area.width = 65
        p.play("attack2Left")
    }
})
// face right when attack end
p.onAnimEnd("attack2", () => {
    p.area.width = 25;
    p.origin = "botleft";
    p.use(sprite("persoIdle"));
    p.play("idle");
})

// face left when attack end
p.onAnimEnd("attack2Left", () => {
    p.area.width = 25;
    p.origin = "botright";
    p.use(sprite("persoIdle", { flipX: true }));
    p.play("idle");
    p.onAnimEnd("idle", ()=> { p.flipX = false;})
})
// END





/*COLLISION*/


const barreVie = add([
    pos(50, 100),
    rect(240, 50),
    outline(0),
    origin("left"),
    color(rgb(50, 166, 168))

])

const barreVieEnnemy = add([
    pos(500, 100),
    rect(240, 50),
    outline(0),
    origin("left"),

    color(rgb(153, 57, 137)),

])

const vie = add([
    text("100", {
        size: 28, // 48 pixels tall
        width: 320, // it'll wrap to next line when width exceeds this value
        font: "sink", // there're 4 built-in fonts: "apl386", "apl386o", "sink", and "sinko"

    }),

    pos(80, 86),
    color(rgb(255, 255, 255)),

]);
const vieEnemy = add([
    text("100", {
        size: 28, // 48 pixels tall
        width: 320, // it'll wrap to next line when width exceeds this value
        font: "sink", // there're 4 built-in fonts: "apl386", "apl386o", "sink", and "sinko"
    }),
    pos(650, 86),
    color(rgb(255, 255, 255)),

]);

const timerText = add([
    text("00", {
        size: 28, // 48 pixels tall
        width: 320, // it'll wrap to next line when width exceeds this value
        font: "sink", // there're 4 built-in fonts: "apl386", "apl386o", "sink", and "sinko"
    }),
    pos(380, 86),
    color(rgb(255, 255, 255)),

]);

/*Function du timer sur l'ecran*/
window.setInterval(() => {
    if (timer <= 9) {
        timerText.text = "0" + timer
        timer++
    } else {
        timerText.text = timer
        timer++
    }

}, 1000);

/* ***************/


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
    barreVie.width = percentage;
    //console.log(percentage)
};

// function takeDegat(position, dammage) {
//     barreVie.text = dammage
//     barreVie.onUpdate(() => {
//         barreVie.scale += 0.0085
//         barreVie.opacity += 0.5

//     })


// }


function takeDegat(position, dammage, colors) {

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

        color(colors),
        pos(position),
        {
            value: 0
        },

    ])
    // perf - console.table(degat)

    degat.scale = 0.0085
    degat.opacity = 1
    degat.text = dammage
    degat.onUpdate(() => {
        degat.scale += 0.0085
        degat.opacity -= 0.005

    })
    setTimeout(() => {


        destroy(degat)
    }, 400)

}





enemy2.onCollide("p", (p) => {


    if (enemy2.curAnim() == "attack2Left" || enemy2.curAnim() == "attack2" ) {
        takeDegat(p.pos, "-10", rgb(50, 166, 168))
        //  perf - console.log(adversaire.attack(joueur))
        vie.text = joueur.getvie()
        // p.color=rgb(rand(0, 255), rand(0, 255), rand(0, 255))
        shake(2)
    }

})


p.onCollide("enemy2", (enemy2) => {

    // perf - console.log(p.curAnim())
    if (p.curAnim() == "attack2" || p.curAnim() == "attack2Left" ) {
        shake(2)

        // enemy2.color=rgb(rand(0, 255), rand(0, 255), rand(0, 255))
        takeDegat(enemy2.pos, "+10", rgb(153, 57, 137))
        // perf - console.log(joueur.attack(adversaire))
        vieEnemy.text = adversaire.getvie()
    }

})
// p.onUpdate(() => { p.origin="center";  })


p.onUpdate(() => {

    if (joueur.getvie() <= 0) {
        //console.log("GAME OVER")
        /*On  envoie le resultat du combat avec la fonction endGame*/
        let score = joueur.getvie() * 100
        endGame(score, 'lose', timer)
           //document.querySelector(".progression-container").style.display="initial"
           document.querySelector(".progression-container").classList.add("slide-fwd-center")
           document.querySelector(".result-title").innerText="GAME OVER"
           document.querySelector("canvas").style.cssText = " filter: blur(3px);z-index: -1;"
           document.querySelector("#score").innerText = score
          
        vie.text = 0
        p.angle -= 50 * dt()
        // e.paused = true
        p.angle -= 145 * dt()
        // debug.paused = true
        p.jump(1255)
        p.pos.x -= 12
        enemy2.paused = true
    }
})
enemy2.onUpdate(async () => {
    // p.color=rgb(rand(0, 255), rand(0, 255), rand(0, 255))
    if (adversaire.getvie() <= 0) {
       // console.log("YOU WIN")
        vieEnemy.text = 0
        /*On  envoie le resultat du combat avec la fonction endGame*/
         score = joueur.getvie() * 100
        endGame(score, 'WIN', timer)
        //document.querySelector(".progression-container").style.display="initial"
        document.querySelector(".progression-container").classList.add("slide-fwd-center")
        document.querySelector(".result-title").innerText="YOU WON"
        document.querySelector("canvas").style.cssText = " filter: blur(3px);z-index: -1;"
        document.querySelector("#score").innerText = score
        enemy2.angle += 145 * dt()
        // debug.paused = true
        enemy2.jump(1355)
        enemy2.pos.x += 12


    }
})
enemy2.onUpdate(() => {
    //shake(2)

})

/* *******FIN COLLISION ET DEGAT*********** */












onKeyDown("left", () => {
    attackTurn = true;
    // on peut pas bouger et attaquer en même temps
    if (!isKeyDown("a") && !isKeyDown("z") && !isKeyDown("right")) {
        p.move(-SPEED, 0);
        // .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
        if (p.isGrounded() && p.curAnim() !== "runLeft") {
            p.origin = "botleft";
            p.use(sprite("persoRunLeft"));
            p.play("runLeft");
        }
    }
})

onKeyRelease("left", () => {
    if (p.isGrounded()) {
        p.origin = "botright";
        p.use(sprite("persoIdle", { flipX: true }));
        p.play("idle");
        p.onAnimEnd("idle", ()=> { p.flipX = false})
    }
})

onKeyDown("right", () => {
    attackTurn = false;
    if (!isKeyDown("a") && !isKeyDown("z") && !isKeyDown("left")) {
        p.move(+SPEED, 0)
        // .play() will reset to the first frame of the anim, so we want to make sure it only runs when the current animation is not "run"
        if (p.isGrounded() && p.curAnim() !== "run") {
            p.origin = "botleft";
            p.use(sprite("persoRun"))
            p.play("run")
        }
    }
})

onKeyRelease("right", () => {
    if (p.isGrounded()) {
        p.origin = "botleft";
        p.use(sprite("persoIdle"));
        p.play("idle");
    }
})

onKeyPress(["space", "up"], () => {
    // .move() is provided by pos() component, move by pixels per second
    if (p.isGrounded()) {
        p.jump(JUMP_FORCE);
        p.origin = "botleft";
        p.use(sprite("persoJump"), { flipX: false });
        p.play("jump");
    }
})

onKeyRelease(["space", "up"], () => {
    p.onCollide("sol", ()=> {
            p.origin = "botleft";
            p.use(sprite("persoIdle"));
            p.play("idle");
    })
})
let persoPrincipale = new player(100, 10, 20)


// tentative fix origin

// async function fixOrigin(target) {
//     if (target.origin === "botright")
// }


/*Fonction pour terminer le jeu et recuperer le gagnant*/
/**
 * 
 * @param {score final} score 
 * @param {win or lose} result 
 * @param {temps de jeu} speed 
 */
function endGame(score, result, speed) {
    

    dataStat = {
        idUser: idU,
        idMap: 1,
        score: score,
        result: result,
        speed: speed,
        degats: 100,
        bossLive: 100,
        gameEnd: 1,
    };
}
// endGame()
debug.inspect = true
debug.showLog = true