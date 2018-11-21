import Bird from './bird.mjs';
import Pipe from './pipe.mjs';

export default class World {
    constructor(width, height, gravity, populationSize, birdTemplate, pipeTemplate) {
        this.width = width;
        this.height = height;
        this.gravity = gravity;
        this.populationSize = populationSize;
        this.birdTemplate = birdTemplate;
        this.pipeTemplate = pipeTemplate;

        this.updateCounter = 0;

        // create birds
        this.birds = [];
        for (let i = 0; i < populationSize; i++) {
            let b = birdTemplate;
            this.birds.push(new Bird(b.xPosition, b.altitude, b.size, b.climbVelocity, b.maxDiveVelocity, 0, height));
        }

        // create first pipe
        this.pipes = [];
        let p = pipeTemplate;
        this.pipes.push(new Pipe(this.width, this.height, p.width, p.velocity, p.passageHeight));
    }

    update() {
        // update birds
        for (let bird of this.birds) {
            bird.update(this.gravity);
        }

        // update pipes
        for (let pipe of this.pipes) {
            pipe.update();
        }

        // check for collision
        for (let bird of this.birds) {
            for (let pipe of this.pipes) {
                if (pipe.isCollision(bird)) {
                    bird.alive = false;
                }
            }
        }

        // increase update counter and spawn new pipe
        if (++this.updateCounter === this.pipeTemplate.spawnInterval) {
            this.updateCounter = 0;
            let p = this.pipeTemplate;
            this.pipes.push(new Pipe(this.width, this.height, p.width, p.velocity, p.passageHeight));
        }

        // delete pipes out of world
        if (this.pipes.length > 0 && this.pipes[0].left + this.pipes[0].width < 0) {
            this.pipes.splice(0, 1);
        }
    }
}