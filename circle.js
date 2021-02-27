class Circle {

    constructor(x, y, radius, vx, vy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.colliding = false;
    }

    /**
     * 绘制小球
     * */
    draw(context) {
        context.fillStyle = this.colliding
            ? 'hsl(300, 100%, 70%)'
            : 'hsl(170, 100%, 50%)';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }

    /**
     * 更新画布
     * @param {number} seconds
     */
    update(seconds) {
        this.x += this.vx * seconds;
        this.y += this.vy * seconds;
    }

    isCircleCollidedWith(other) {
        const squareDistance =
            Math.pow(this.x - other.x, 2) +
            Math.pow(this.y - other.y, 2);
        const squareRadius = Math.pow(this.radius + other.radius, 2);
        return squareDistance <= squareRadius;
    }

    checkCollideWith(other) {
        if (this.isCircleCollidedWith(other)) {
            this.colliding = true;
            other.colliding = true;
        }
    }

    checkEdgeCollisionInX(width) {
        this._checkEdgeCollision(width, 'x', 'vx');
    }

    checkEdgeCollisionInY(height) {
        this._checkEdgeCollision(height, 'y', 'vy');
    }

    _checkEdgeCollision(range, coordinate, velocity) {
        if (this[coordinate] < this.radius) {
            this[velocity] = -this[velocity];
            this[coordinate] = this.radius;
        } else if (this[coordinate] > range - this.radius) {
            this[velocity] = -this[velocity];
            this[coordinate] = range - this.radius;
        }
    }

}

export default Circle;
