import assert from 'assert';
import World from '../src/world.mjs';

// parameters for a standard world
const width = 200;
const height = 100;
const gravity = 2;
const populationSize = 2;
// with a standard bird
const birdTemplate = {
    "xPosition": 10, 
    "altitude": 50, 
    "size": 4, 
    "climbVelocity": 10, 
    "maxDiveVelocity": 50
};
// and a standard pipe
const pipeTemplate = {
    "width": 10, 
    "velocity": -2, 
    "passageHeight": 20,
    "spawnInterval": 5  
};

describe('World', function() {
    it('should start with updateCounter = 0', function() {
        let world = new World(width, height, gravity, populationSize, birdTemplate, pipeTemplate);
        assert.equal(world.updateCounter, 0);
    });

    it('should start with the number populationSize of birds', function() {
        let world = new World(width, height, gravity, populationSize, birdTemplate, pipeTemplate);
        assert.equal(world.birds.length, populationSize);
    });

    it('should start with one pipe', function() {
        let world = new World(width, height, gravity, populationSize, birdTemplate, pipeTemplate);
        assert.equal(world.pipes.length, 1);
    });

    describe('#update()', function() {
        it('should increase updateCounter by one', function() {
            let world = new World(width, height, gravity, populationSize, birdTemplate, pipeTemplate);
            world.update();
            assert.equal(world.updateCounter, 1);
        });

        it('should reset the updateCounter after the number spawnInterval of updates', function() {
            let world = new World(width, height, gravity, populationSize, birdTemplate, pipeTemplate);
            for (let i = 0; i < pipeTemplate.spawnInterval; i++) {
                world.update();
            }
            assert.equal(world.updateCounter, 0);
        });

        it('should spawn a new pipe after the number of spawnInterval of updates', function() {
            let world = new World(width, height, gravity, populationSize, birdTemplate, pipeTemplate);
            for (let i = 0; i < pipeTemplate.spawnInterval; i++) {
                world.update();
            }
            assert.equal(world.pipes.length, 2);
        });
    });
});