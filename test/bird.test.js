import assert from 'assert';
import {Bird} from '../src/bird.js';

describe('Bird', function() {
    it('should start with velocity 0', function() {
        let xPosition = 10;
        let altitude = 50;
        let size = 2;
        let climbVelocity = 10;
        let maxDiveVelocity = 50;
        let minAltitude = 0;
        let maxAltitude = 100;
        let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
        assert.equal(bird.velocity, 0);
    });

    it('should start alive', function() {
        let xPosition = 10;
        let altitude = 50;
        let size = 2;
        let climbVelocity = 10;
        let maxDiveVelocity = 50;
        let minAltitude = 0;
        let maxAltitude = 100;
        let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
        assert.equal(bird.alive, true);
    });

    describe('#climb()', function() {
        it('should set the current velocity to climbVelocity', function() {
            let xPosition = 10;
            let altitude = 50;
            let size = 2;
            let climbVelocity = 10;
            let maxDiveVelocity = 50;
            let minAltitude = 0;
            let maxAltitude = 100;
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.climb();
            assert.equal(bird.climbVelocity, climbVelocity);
        });
    });

    describe('#update()', function() {
        it('should decrease velocity by gravity', function() {
            let gravity = 2;
            let xPosition = 10;
            let altitude = 50;
            let size = 2;
            let climbVelocity = 10;
            let maxDiveVelocity = 50;
            let minAltitude = 0;
            let maxAltitude = 100;
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.update(gravity);
            assert.equal(bird.velocity, -2);
        });

        it('should not decrease velocity below negative maxDiveVelocity', function() {
            let gravity = 2000;
            let xPosition = 10;
            let altitude = 50;
            let size = 2;
            let climbVelocity = 10;
            let maxDiveVelocity = 50;
            let minAltitude = 0;
            let maxAltitude = 100;
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.update(gravity);
            assert.equal(bird.velocity, -maxDiveVelocity);
        });

        it('should change altitude by velocity after it has decreased velocity by gravity', function() {
            let gravity = 2;
            let xPosition = 10;
            let altitude = 50;
            let size = 2;
            let climbVelocity = 10;
            let maxDiveVelocity = 50;
            let minAltitude = 0;
            let maxAltitude = 100;
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.update(gravity);
            bird.update(gravity);
            assert.equal(bird.altitude, 44);
        });

        it('should not decrease altitude below minAltitude', function() {
            let gravity = 2000;
            let xPosition = 10;
            let altitude = 50;
            let size = 2;
            let climbVelocity = 10;
            let maxDiveVelocity = 2000;
            let minAltitude = 0;
            let maxAltitude = 100;
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.update(gravity);
            assert.equal(bird.altitude, minAltitude);
        });

        it('should not increase altitude above maxAltitude', function() {
            let gravity = 0;
            let xPosition = 10;
            let altitude = 50;
            let size = 2;
            let climbVelocity = 1000;
            let maxDiveVelocity = 50;
            let minAltitude = 0;
            let maxAltitude = 100;
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.climb();
            bird.update(gravity);
            assert.equal(bird.altitude, maxAltitude);
        });
    });
});