import {expect} from 'chai';
import Pipe from '../src/pipe.mjs';
import Bird from '../src/bird.mjs';

// parameters for a standard bird
const xPosition = 110;
const altitude = 50;
const size = 4;
const climbVelocity = 10;
const maxDiveVelocity = 50;
const minAltitude = 2;
const maxAltitude = 98;

// parameters for a standard pipe
const left = 100;
const top = 100;
const width = 20;
const velocity = -10;
const passageHeight = 20;

describe('Pipe', function() {
    describe('#update()', function() {
        it('should increase left by velocity', function() {
            let pipe = new Pipe(left, top, width, velocity, passageHeight);
            pipe.update();
            expect(pipe.left).to.equal(left+velocity);
        });
    });

    describe('#isCollision()', function() {
        it('should return false if the bird is in front of the pipe', function() {
            let bird = new Bird(xPosition-width, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            let pipe = new Pipe(left, top, width, velocity, passageHeight);
            expect(pipe.isCollision(bird)).to.equal(false);
        });

        it('should return false if the bird has passed the pipe', function() {
            let bird = new Bird(xPosition+width, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            let pipe = new Pipe(left, top, width, velocity, passageHeight);
            expect(pipe.isCollision(bird)).to.equal(false);
        });

        it('should return false if the bird fits in the passage', function() {
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            let pipe = new Pipe(left, top, width, velocity, passageHeight);
            pipe.passageTop = 60;
            expect(pipe.isCollision(bird)).to.equal(false);
        });

        it('should return true if the bird is within the pipe', function() {
            let bird = new Bird(xPosition, maxAltitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            let pipe = new Pipe(left, top, width, velocity, passageHeight);
            pipe.passageTop = 60;
            expect(pipe.isCollision(bird)).to.equal(true);
        });

        it('should return true if the bird touches an edge of the pipe', function() {
            let bird = new Bird(left-1, 59, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            let pipe = new Pipe(left, top, width, velocity, passageHeight);
            pipe.passageTop = 60;
            expect(pipe.isCollision(bird)).to.equal(true);
        });
    });
});