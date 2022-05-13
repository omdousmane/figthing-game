
kaboom({
    width: 800,
    height: 600,
    font: "sinko",
    background: [ 0, 0, 5,0.2 ],
})
const SPEED = 120
const JUMP_FORCE = 240
gravity(640)

let bgImage = loadSprite("background", "../assets/5.png");
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
			speed: 5,
			loop: true,
		},
		
	},
})



// loadSprite("persoRun","../assets/sprites/test_samurai/Run.png", {
// 	// The image contains 9 frames layed out horizontally, slice it into individual frames
// 	sliceX: 8,
// 	// Define animations
// 	anims: {
		
// 		"run": {
// 			from: 0,
// 			to: 7,
// 			speed: 10,
// 			loop: true,
// 		}
// 	},
// })

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
    area({ width: 35, height: 40 }),
	pos(),
	origin("left"),
    scale(4),
	
	body(),
])
p.play("idle")
const sol=add([
    pos(0, 580),
    rect(850, 20),
    outline(4),
    area(),
    solid(),
])





onKeyPress("e",()=>{

p.move(-SPEED, 0)

})
let persoPrincipale=new player(100,10,20)




debug.inspect = true
add([
    text("hello"),
    pos(120, 80),
]);