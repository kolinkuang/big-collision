import Circle from './circle.js';

class Gameboard {

    constructor(width, height, context) {
        this.startTime = null;
        this.circles = null;
        this.width = width;
        this.height = height;
        this.context = context;
        this.init();
    }

    init() {
        this.circles = [
            new Circle(30, 50, 30, -100, 390, 30),
            new Circle(60, 180, 20, 180, -275, 20),
            new Circle(120, 100, 60, 120, 262, 100),
            new Circle(150, 180, 10, -130, 138, 10),
            new Circle(190, 210, 10, 138, -280, 10),
            new Circle(220, 240, 10, 142, 350, 10),
            new Circle(100, 260, 10, 135, -460, 10),
            new Circle(120, 285, 10, -165, 370, 10),
            new Circle(140, 290, 10, 125, 230, 10),
            new Circle(160, 380, 10, -175, -180, 10),
            new Circle(180, 310, 10, 115, 440, 10),
            new Circle(100, 310, 10, -195, -325, 10),
            new Circle(60, 150, 10, -138, 420, 10),
            new Circle(70, 430, 45, 135, -230, 45),
            new Circle(250, 290, 40, -140, 335, 40)
        ];
        window.requestAnimationFrame(this.process.bind(this));
    }

    process(now) {
        if (!this.startTime) {
            this.startTime = now;
        }
        const seconds = (now - this.startTime) / 1000;
        this.startTime = now;
        for (let i = 0; i < this.circles.length; i++) {
            this.circles[i].update(seconds);
        }

        this.context.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.circles.length; i++) {
            this.circles[i].draw(this.context);
        }

        this.checkCollision();
        this.checkEdgeCollision();

        window.requestAnimationFrame(this.process.bind(this));
    }

    checkCollision() {
        // 重置碰撞状态
        this.circles.forEach(circle => circle.colliding = false);
        for (let i = 0; i < this.circles.length; i++) {
            // j 非从 0 开始；已优化
            for (let j = i + 1; j < this.circles.length; j++) {
                this.circles[i].checkCollideWith(this.circles[j]);
            }
        }
    }

    checkEdgeCollision() {
        this.circles.forEach(circle => {
            // 左右墙壁碰撞
            circle.checkEdgeCollisionInX(this.width);
            // 上下墙壁碰撞
            circle.checkEdgeCollisionInY(this.height);
        });
    }

}

export default Gameboard;
