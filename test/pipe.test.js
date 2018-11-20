import assert from 'assert';
import {Pipe} from '../src/pipe.js';
import {Bird} from '../src/bird.js';

describe('Pipe', function() {
    describe('#update()', function() {
        it('should increase left by velocity', function() {
            let left = 100;
            let top = 100;
            let width = 10;
            let velocity = -10;
            let passageHeight = 20;
            let pipe = new Pipe(left, top, width, velocity, passageHeight);
            pipe.update();
            assert.equal(pipe.left, left+velocity);
        });
    });

    describe('#isCollision()', function() {
        it('should return false if the bird is in front of the pipe', function() {
            let xPosition = 20;
            let altitude = 50;
            let size = 20;
            let climbVelocity = 10;
            let maxDiveVelocity = 50;
            let minAltitude = 0;
            let maxAltitude = 100;
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);

            let left = 100;
            let top = 100;
            let width = 10;
            let velocity = -10;
            let passageHeight = 20;
            let pipe = new Pipe(left, top, width, velocity, passageHeight);

            assert.equal(pipe.isCollision(bird), false);
        });

        it('should return false if the bird has passed the pipe', function() {
            let xPosition = 200;
            let altitude = 50;
            let size = 20;
            let climbVelocity = 10;
            let maxDiveVelocity = 50;
            let minAltitude = 0;
            let maxAltitude = 100;
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);

            let left = 100;
            let top = 100;
            let width = 10;
            let velocity = 0;
            let passageHeight = 20;
            let pipe = new Pipe(left, top, width, velocity, passageHeight);

            assert.equal(pipe.isCollision(bird), false);
        });

        it('should return false if the bird fits in the passage', function() {
            let xPosition = 105;
            let altitude = 50;
            let size = 10;
            let climbVelocity = 10;
            let maxDiveVelocity = 50;
            let minAltitude = 0;
            let maxAltitude = 100;
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);

            let left = 100;
            let top = 100;
            let width = 10;
            let velocity = 0;
            let passageHeight = 20;
            let pipe = new Pipe(left, top, width, velocity, passageHeight);
            pipe.passageTop = 60;

            assert.equal(pipe.isCollision(bird), false);
        });

        it('should return true if the bird is in the pipe', function() {
            let xPosition = 105;
            let altitude = 20;
            let size = 10;
            let climbVelocity = 10;
            let maxDiveVelocity = 50;
            let minAltitude = 0;
            let maxAltitude = 100;
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);

            let left = 100;
            let top = 100;
            let width = 10;
            let velocity = 0;
            let passageHeight = 20;
            let pipe = new Pipe(left, top, width, velocity, passageHeight);
            pipe.passageTop = 60;

            assert.equal(pipe.isCollision(bird), true);
        });

        it('should return true if the bird touches an edge of the pipe', function() {
            let xPosition = 96;
            let altitude = 58;
            let size = 10;
            let climbVelocity = 10;
            let maxDiveVelocity = 50;
            let minAltitude = 0;
            let maxAltitude = 100;
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);

            let left = 100;
            let top = 100;
            let width = 10;
            let velocity = 0;
            let passageHeight = 20;
            let pipe = new Pipe(left, top, width, velocity, passageHeight);
            pipe.passageTop = 60;

            assert.equal(pipe.isCollision(bird), true);
        });
    });
});