import Vector from './vector.js';

class Circle {

    constructor(x, y, radius, vx, vy, mass = 1, recovery = 1) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.colliding = false;
        this.mass = mass;
        this.recovery = recovery;
    }

    /**
     * 绘制小球
     * @param {OffscreenCanvasRenderingContext2D} context
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
     * @param {Number} seconds
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
            this.changeVelocityAndDirectionWith(other);
        }
    }

    checkEdgeCollisionInX(width, edgeRecovery) {
        this._checkEdgeCollision(...arguments, 'x', 'vx');
    }

    checkEdgeCollisionInY(height, edgeRecovery) {
        this._checkEdgeCollision(...arguments, 'y', 'vy');
    }

    _checkEdgeCollision(range, edgeRecovery, coordinate, velocity) {
        if (this[coordinate] < this.radius) {
            this[velocity] = -this[velocity] * edgeRecovery;
            this[coordinate] = this.radius;
        } else if (this[coordinate] > range - this.radius) {
            this[velocity] = -this[velocity] * edgeRecovery;
            this[coordinate] = range - this.radius;
        }
    }

    changeVelocityAndDirectionWith(other) {
        // 两小球的速度向量
        const velocity1 = new Vector(this.vx, this.vy);
        const velocity2 = new Vector(other.vx, other.vy);

        // 连心线方向的向量
        // 也就是两个圆心坐标的差
        const vNorm = new Vector(this.x, this.y).substract(new Vector(other.x, other.y));

        // 连心线方向的单位向量和切线方向上的单位向量
        // 这些单位向量代表的是连心线和切线的方向
        const unitVNorm = vNorm.normalize();    // 连心线方向单位向量
        const unitVTan = new Vector(-unitVNorm.y, unitVNorm.x); // 切线方向单位向量

        // 使用点乘计算小球速度在这两个方向上的投影
        // v1n 和 v1t 表示当前小球在连心线和切线方向的速度值
        // v2n 和 v2t 则表示的是碰撞小球的速度值
        const v1n = velocity1.dot(unitVNorm);
        const v1t = velocity1.dot(unitVTan);
        const v2n = velocity2.dot(unitVNorm);
        const v2t = velocity2.dot(unitVTan);

        // 碰撞后的速度（加上小球对撞的恢复系数）
        // v1nAfter 和 v2nAfter 分别是两小球碰撞后的速度标量
        const recovery = Math.min(this.recovery, other.recovery);
        const v1nAfter =
            (this.mass * v1n + other.mass * v2n + recovery * other.mass * (v2n - v1n)) /
            (this.mass + other.mass);
        const v2nAfter =
            (this.mass * v1n + other.mass * v2n + recovery * this.mass * (v1n - v2n)) /
            (this.mass + other.mass);

        if (v1nAfter < v2nAfter) {
            // TODO: 两小球会越来越远，此时不用处理碰撞？
            // TODO: 需要补充物理知识
            return;
        }

        // 两小球在连心线方向和切线方向上的新速度向量
        const v1VectorNorm = unitVNorm.multiply(v1nAfter);
        const v1VectorTan = unitVTan.multiply(v1t);
        const v2VectorNorm = unitVNorm.multiply(v2nAfter);
        const v2VectorTan = unitVTan.multiply(v2t);

        // 碰撞后两小球的速度向量
        const velocity1After = v1VectorNorm.add(v1VectorTan);
        const velocity2After = v2VectorNorm.add(v2VectorTan);

        // 把向量中的 x 和 y 分别还原到小球的 vx 和 vy 属性中
        this.vx = velocity1After.x;
        this.vy = velocity1After.y;
        other.vx = velocity2After.x;
        other.vy = velocity2After.y;
    }

}

export default Circle;
