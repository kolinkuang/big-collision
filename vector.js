class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * 向量加法
     * @param {Vector} v
     */
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    /**
     * 向量减法
     * @param {Vector} v
     */
    substract(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    /**
     * 向量与标量乘法
     * @param {Vector} s
     */
    multiply(s) {
        return new Vector(this.x * s, this.y * s);
    }

    /**
     * 向量与向量点乘（投影）
     * @param {Vector} v
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * 向量标准化（除去长度）
     */
    normalize() {
        let distance = Math.sqrt(this.x * this.x + this.y * this.y);
        return new Vector(this.x / distance, this.y / distance);
    }
}
