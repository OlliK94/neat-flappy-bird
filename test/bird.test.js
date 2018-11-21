import {expect} from 'chai';
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
        expect(bird.velocity).to.equal(0);
    });

    it('should start alive', function() {
        let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
        expect(bird.alive).to.equal(true);
    });

    describe('#climb()', function() {
        it('should set the current velocity to climbVelocity', function() {
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.climb();
            expect(bird.climbVelocity).to.equal(climbVelocity);
        });
    });

    describe('#update()', function() {
        it('should decrease velocity by gravity', function() {
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.update(gravity);
            expect(bird.velocity).to.equal(-2);
        });

        it('should not decrease velocity below negative maxDiveVelocity', function() {
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.velocity = -maxDiveVelocity;
            bird.update(gravity);
            expect(bird.velocity).to.equal(-maxDiveVelocity);
        });

        it('should change altitude by velocity after it has decreased velocity by gravity', function() {
            let bird = new Bird(xPosition, altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.update(gravity);
            bird.update(gravity);
            expect(bird.altitude).to.equal(44);
        });

        it('should not decrease altitude below minAltitude', function() {
            let bird = new Bird(xPosition, minAltitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.update(gravity);
            expect(bird.altitude).to.equal(minAltitude);
        });

        it('should not increase altitude above maxAltitude', function() {
            let bird = new Bird(xPosition, maxAltitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.climb();
            bird.update(gravity);
            expect(bird.altitude).to.equal(maxAltitude);
        });

        it('should kill the bird if it reaches minAltitude', function() {
            let bird = new Bird(xPosition, minAltitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.update(gravity);
            expect(bird.alive).to.equal(false);
        });

        it('should kill the bird if it reaches maxAltitude', function() {
            let bird = new Bird(xPosition, maxAltitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude);
            bird.climb();
            bird.update(gravity);
            expect(bird.alive).to.equal(false);
        });
    });
});