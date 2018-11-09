export class Bird {
    constructor(altitude, size, climbVelocity, maxDiveVelocity, minAltitude, maxAltitude) {
        this.altitude = altitude;
        this.size = size;
        this.climbVelocity = climbVelocity;
        this.maxDiveVelocity = maxDiveVelocity;
        this.minAltitude = minAltitude;
        this.maxAltitude = maxAltitude;
        this.velocity = 0;
    }

    climb() {
        // set velocity to positive climb-velocity
        this.velocity = this.climbVelocity;
    }

    update(gravity) {
        // decrease velocity
        this.velocity -= gravity;
        if (this.velocity < -this.maxDiveVelocity) {
            this.velocity = -this.maxDiveVelocity;
        }

        // change altitude
        this.altitude += this.velocity;
        if (this.altitude > this.maxAltitude) {
            this.altitude = this.maxAltitude;
        } else if (this.altitude < this.minAltitude) {
            this.altitude = this.minAltitude;
        }
    }
}