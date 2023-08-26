import { deepCopy } from "../utils/utils.js";
import Matrix from "./Matrix.js";

export default class Vector extends Array {
    /**
     * @param  {...number} nums
     */
    constructor(...nums) {
        super(...nums);
    }

    /**
     * mult a scalar
     * @param {number} num
     * @returns {Vector}
     */
    mult(num) {
        const ans = Matrix.from(this.row, 1, 1).toVector();
        for (let i = 0; i < this.row; i++) {
            ans[i] = num * this[i];
        }
        return ans;
    }

    /**
     * returns mat.mult(this)
     * @param {Matrix} mat
     * @returns {Vector}
     */
    trans(mat) {
        return mat.mult(this);
    }

    /**
     * @param {Vector} vec
     * @returns {number}
     */
    dot(vec) {
        let ans = 0;
        this.forEach((num, i) => {
            ans += num * vec[i];
        });
        return ans;
    }

    /**
     * returns hadamard product of this vector and vec
     * @param {Vector} vec
     * @returns {Vector}
     */
    elMult(vec) {
        const ans = Matrix.zeros(this.row, 1).toVector();

        for (let j = 0; j < this.row; j++) {
            ans[j] = this[j] * vec[j];
        }

        return ans;
    }

    /**
     * @param {Vector} vec
     * @returns {Vector}
     */
    add(vec) {
        return this.toMatrix().add(vec.toMatrix()).toVector();
    }

    /**
     * @param {Vector} vec
     * @returns {Vector}
     */
    reduce(vec) {
        return this.toMatrix().reduce(vec.toMatrix()).toVector();
    }

    /**
     * normalize this vector
     * @returns {Vector}
     */
    normal() {
        const ans = this.clone();
        ans.norm = 1;
        return ans;
    }

    /**
     * return a deep copy clone of this vector
     * @returns {Vector}
     */
    clone() {
        return deepCopy(this);
    }

    /**
     * copy values from another vector
     */
    copy(vec) {
        vec.forEach((num, i) => {
            this[i] = num;
        });
        return this;
    }

    /**
     * @returns {Matrix}
     */
    toMatrix() {
        return new Matrix(Array.from(this));
    }

    /**
     * @param {*} obj
     * @returns {boolean}
     */
    static isVector(obj) {
        return obj instanceof Vector;
    }

    /**
     * @param {number} val
     */
    set norm(val) {
        this.copy(this.mult(val / this.norm));
    }

    /**
     * @type {number}
     */
    get norm() {
        return Math.sqrt(this.dot(this));
    }

    /**
     * @type {number}
     */
    get row() {
        return this.length;
    }
}
