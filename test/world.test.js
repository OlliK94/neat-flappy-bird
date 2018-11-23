import {expect, use, spy} from 'chai';
import spies from 'chai-spies';
import World from '../src/world.mjs';

use(spies);

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
        expect(world.updateCounter).to.equal(0);
    });

    it('should start with the number populationSize of birds', function() {
        let world = new World(width, height, gravity, populationSize, birdTemplate, pipeTemplate);
        expect(world.birds.length).to.equal(populationSize);
    });

    it('should start with one pipe', function() {
        let world = new World(width, height, gravity, populationSize, birdTemplate, pipeTemplate);
        expect(world.pipes.length).to.equal(1);
    });

    describe('#update()', function() {
        it('should increase updateCounter by 1', function() {
            let world = new World(width, height, gravity, populationSize, birdTemplate, pipeTemplate);
            world.update();
            expect(world.updateCounter).to.equal(1);
        });

        it('should reset the updateCounter after the number spawnInterval of updates', function() {
            let world = new World(width, height, gravity, populationSize, birdTemplate, pipeTemplate);
            for (let i = 0; i < pipeTemplate.spawnInterval; i++) {
                world.update();
            }
            expect(world.updateCounter).to.equal(0);
        });

        it('should spawn a new pipe after the number of spawnInterval of updates', function() {
            let world = new World(width, height, gravity, populationSize, birdTemplate, pipeTemplate);
            for (let i = 0; i < pipeTemplate.spawnInterval; i++) {
                world.update();
            }
            expect(world.pipes.length).to.equal(2);
        });

        it('should call #update() on all pipes', function() {
            let world = new World(width, height, gravity, populationSize, birdTemplate, pipeTemplate);
            // spawn a second pipe
            for (let i = 0; i < pipeTemplate.spawnInterval; i++) {
                world.update();
            }

            spy.on(world.pipes[0], 'update');
            spy.on(world.pipes[1], 'update');
            world.update();
            expect(world.pipes[0].update).to.have.been.called();
            expect(world.pipes[1].update).to.have.been.called();
        });

        it('should call #update() on all birds with gravity', function() {
            let world = new World(width, height, gravity, populationSize, birdTemplate, pipeTemplate);
            spy.on(world.birds[0], 'update');
            spy.on(world.birds[1], 'update');
            world.update();
            expect(world.birds[0].update).to.have.been.called.with(gravity);
            expect(world.birds[1].update).to.have.been.called.with(gravity);
        });
    });
});