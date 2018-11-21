import World from '/src/world.mjs';

const fpsLock = 30;

// world parameters
const worldWidth = 500;
const worldHeight = 600;
const gravity = 2;
const populationSize = 50;
const worldColor = {
    "r": 51,
    "g": 51,
    "b": 51
};

// bird parameters
const birdTemplate = {
    "xPosition": 100, 
    "altitude": 300, 
    "size": 40, 
    "climbVelocity": 18, 
    "maxDiveVelocity": 100
};
const birdColor = {
    "r": 255,
    "g": 255,
    "b": 255,
    "alpha": 50
};
const birdDeadColor = {
    "r": 0,
    "g": 0,
    "b": 0,
    "alpha": 50
};

// pipe parameters
const pipeTemplate = {
    "width": 70, 
    "velocity": -10, 
    "passageHeight": 180,
    "spawnInterval": 30  
};
const pipeColor = {
    "r": 150,
    "g": 150,
    "b": 150
};

let world;
let birdIsAliveMemory;

new p5(function(p5) {
    p5.setup = function() {
        p5.frameRate(fpsLock);
        p5.createCanvas(worldWidth, worldHeight);
        world = new World(worldWidth, worldHeight, gravity, populationSize, birdTemplate, pipeTemplate);

        birdIsAliveMemory = [];
        for (let i = 0; i < world.birds.length; i++) {
            birdIsAliveMemory.push(world.birds[i].alive);
        }
    }
    
    p5.draw = function() {
        p5.background(worldColor.r, worldColor.g, worldColor.b);
    
        // save old bird alive status and then update the world
        for (let i = 0; i < world.birds.length; i++) {
            birdIsAliveMemory[i]= world.birds[i].alive;
        }
        world.update();
    
        // draw pipes
        p5.fill(pipeColor.r, pipeColor.g, pipeColor.b);
        for (let pipe of world.pipes) {
            p5.rect(pipe.left, worldHeight-pipe.passageTop+pipe.passageHeight, pipe.width, pipe.passageTop-pipe.passageHeight);
            p5.rect(pipe.left, 0, pipe.width, pipe.top-pipe.passageTop);
        }
    
        // draw birds
        p5.fill(birdColor.r, birdColor.g, birdColor.b, birdColor.alpha);
        for (let i = 0; i < world.birds.length; i++) {
            if (world.birds[i].alive) {
                p5.ellipse(world.birds[i].xPosition, worldHeight-world.birds[i].altitude, world.birds[i].size);
            }
            else if (birdIsAliveMemory[i]) {
                // draw birds that died in the current update with a different color
                p5.fill(birdDeadColor.r, birdDeadColor.g, birdDeadColor.b, birdDeadColor.alpha);
                p5.ellipse(world.birds[i].xPosition, worldHeight-world.birds[i].altitude, world.birds[i].size);
                p5.fill(birdColor.r, birdColor.g, birdColor.b, birdColor.alpha);
            }
        }
    }
});