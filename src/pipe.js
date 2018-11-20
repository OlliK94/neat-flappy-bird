export class Pipe {
    constructor(left, top, width, velocity, passageHeight) {
        this.left = left;
        this.top = top;
        this.width = width;
        // bottom = 0 -> height = top
        this.velocity = velocity;
        this.passageHeight = passageHeight;
        this.passageTop = Math.floor((top-passageHeight)*Math.random()+1) + passageHeight;
    }

    update() {
        this.left += this.velocity;
    }

    isCollision(bird) {
        // the bird is in front of the pipe
        if (bird.xPosition + bird.size/2 < this.left) return false;
        // the bird has passed the pipe already
        if (bird.xPosition - bird.size/2 > this.left + this.width) return false;
        // the bird fits in the passage
        if (bird.altitude + bird.size/2 < this.passageTop && bird.altitude - bird.size/2 > this.passageTop - this.passageHeight) return false;
        // the center of the bird is in the pipe
        if (bird.xPosition > this.left && bird.xPosition < this.left + this.width && (bird.altitude > this.passageTop || bird.altitude < this.passageTop - this.passageHeight)) return true;
        // the distance from the center of the bird to the top left corner of the passage is smaller than the birds radius
        if (Math.sqrt(Math.pow(bird.xPosition - this.left, 2) + Math.pow(bird.altitude - this.passageTop, 2)) < bird.size/2) return true;
        // the distance from the center of the bird to the top right corner of the passage is smaller than the birds radius
        if (Math.sqrt(Math.pow(bird.xPosition - this.left - this.width, 2) + Math.pow(bird.altitude - this.passageTop, 2)) < bird.size/2) return true;
        // the distance from the center of the bird to the bottom left corner of the passage is smaller than the birds radius
        if (Math.sqrt(Math.pow(bird.xPosition - this.left, 2) + Math.pow(bird.altitude - this.passageTop + this.passageHeight, 2)) < bird.size/2) return true;
        // the distance from the center of the bird to the bottom right corner of the passage is smaller than the birds radius
        if (Math.sqrt(Math.pow(bird.xPosition - this.left - this.width, 2) + Math.pow(bird.altitude - this.passageTop + this.passageHeight, 2)) < bird.size/2) return true;
        return false;
    }
}