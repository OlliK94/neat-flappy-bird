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
        this.velocity = this.climbVelocity;
    }

    update() {
        
    }
}