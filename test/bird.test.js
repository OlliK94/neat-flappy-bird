import assert from 'assert';
import Bird from '../src/bird.mjs';

// parameters for a standard bird
const xPosition = 10;
const altitude = 50;
const size = 4;
const climbVelocity = 10;
const maxDiveVelocity = 50;
const minAltitude = 2;
const maxAltitude = 98;
const gravity = 2;

describe('Bird', function() {
    it('should start with velocity 0', function() {
        let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
        assert.equal(bird.velocity, 0);
    });

    it('should start alive', function() {
        let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
        assert.equal(bird.alive, true);
    });

    describe('#climb()', function() {
        it('should set the current velocity to climbVelocity', function() {
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.climb();
            assert.equal(bird.climbVelocity, climbVelocity);
        });
    });

    describe('#update()', function() {
        it('should decrease velocity by gravity', function() {
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.update(gravity);
            assert.equal(bird.velocity, -2);
        });

        it('should not decrease velocity below negative maxDiveVelocity', function() {
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.velocity = -maxDiveVelocity;
            bird.update(gravity);
            assert.equal(bird.velocity, -maxDiveVelocity);
        });

        it('should change altitude by velocity after it has decreased velocity by gravity', function() {
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.update(gravity);
            bird.update(gravity);
            assert.equal(bird.altitude, 44);
        });

        it('should not decrease altitude below minAltitude', function() {
            let bird = new Bird(xPosition, minAltitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.update(gravity);
            assert.equal(bird.altitude, minAltitude);
        });

        it('should not increase altitude above maxAltitude', function() {
            let bird = new Bird(xPosition, maxAltitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.climb();
            bird.update(gravity);
            assert.equal(bird.altitude, maxAltitude);
        });
    });
});