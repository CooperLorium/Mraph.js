declare module "math/Vector" {
    export default class Vector {
        /**
         * @param {*} obj
         * @returns {boolean}
         */
        static isVector(obj: any): boolean;
        /**
         * @param {number[]} [source = [1]]
         * @returns {Vector}
         */
        constructor(source?: number[]);
        columns: number[];
        /**
         * @param {Matrix} mat
         * @returns {Vector}
         */
        trans(mat: Matrix): Vector;
        /**
         * @param {Vector} vec
         * @returns {Vector}
         */
        add(vec: Vector): Vector;
        /**
         * @param {Vector} vec
         * @returns {Vector}
         */
        reduce(vec: Vector): Vector;
        /**
         * @param {number} row
         * @param {number} [n = 0]
         * the number to be filled with
         * @returns {Vector}
         */
        resize(row: number, n?: number): Vector;
        /**
         * @returns {Matrix}
         */
        toMatrix(): Matrix;
    }
    import Matrix from "math/Matrix";
}
declare module "math/Matrix" {
    export default class Matrix {
        /**
         * @param {*} obj
         * @returns {boolean}
         */
        static isMatrix(obj: any): boolean;
        /**
         * create zeros from shape
         * @param {number} column
         * @param {number} row
         * @returns {Matrix}
         */
        static zeros(column: number, row: number): Matrix;
        /**
         * @param {number} n
         * the number of columns and rows
         * @returns {Matrix}
         */
        static identity(n: number): Matrix;
        /**
         * @param {number[][]} [source = [[1]]]
         * @return {Matrix}
         */
        constructor(source?: number[][]);
        columns: number[][];
        /**
         *
         * @param {Matrix} mat
         * @returns {Matrix}
         */
        mult(mat: Matrix): Matrix;
        /**
         *
         * @param {number} num
         * @returns {Matrix}
         */
        multNum(num: number): Matrix;
        /**
         *
         * @param {Matrix} mat
         * @returns {Matrix}
         */
        add(mat: Matrix): Matrix;
        /**
         *
         * @param {Matrix} mat
         * @returns {Matrix}
         */
        reduce(mat: Matrix): Matrix;
        /**
         * @returns {Vector}
         */
        toVector(): Vector;
        /**
         * @returns {number} the number of columns
         */
        get column(): number;
        /**
         * @returns {number} the number of rows
         */
        get row(): number;
    }
    import Vector from "math/Vector";
}
declare module "utils/utils" {
    /**
     * @param {Object} obj
     * @param {...Object} source
     * @returns {Object}
     */
    export function mergeObject(obj: any, ...source: any[]): any;
}
declare module "renderer/Renderer" {
    export default class Renderer {
        constructor(canvas: any);
        set canvas(arg: any);
        get canvas(): any;
        render(el: any, mat: any): void;
        renderPath(path: any, mat: any): void;
        clear(): void;
        _canvas: any;
        context: any;
    }
}
declare module "core/Layer" {
    export default class Layer {
        constructor(canvas: any);
        elements: any[];
        matrix: Matrix;
        set canvas(arg: any);
        get canvas(): any;
        draw(): void;
        clear(): void;
        _canvas: any;
        renderer: Renderer;
    }
    import Matrix from "math/Matrix";
    import Renderer from "renderer/Renderer";
}
declare module "animation/Action" {
    export default class Action {
        /**
         * @constructor
         * @param {Object} handle - the object to construct by
         *                          which may include function start(), update(), stop()
         * @return {Action}
         */
        constructor(handle: any);
        /**
         * @type {Function}
         */
        start: Function;
        /**
         * @type {Function}
         */
        update: Function;
        /**
         * @type {Function}
         */
        stop: Function;
        /**
         * @type {Boolean}
         */
        isStarted: boolean;
        /**
         * @type {Boolean}
         */
        isStopped: boolean;
        /**
         * excute this action by current time
         * @param {Number} start - the start time
         * @param {Number} stop - the stop time
         * @param {Number} now - the current time
         * @return {null}
         */
        excute(start: number, stop: number, now: number): null;
        /**
         * merge this action with another
         * they should have same start time and stop time
         * @param {Action} - another action
         * @return {Action}
         */
        merge(action: any): Action;
    }
}
declare module "animation/ActionList" {
    export default class ActionList {
        /**
         * list for actions to be called
         * @type {Map}
         */
        list: Map;
        /**
         * @type {number}
         */
        maxTime: number;
        /**
         * @type {number}
         */
        minTime: number;
        /**
         * add an action to action list
         * @param {Number} start
         * @param {Number} stop
         * @param {Object} handle
         * @return {ActionList}
         */
        add(start: number, stop: number, handle: any): ActionList;
        /**
         * play this action list
         */
        play(): void;
    }
}
declare module "mraph" {
    import Matrix from "math/Matrix";
    import Vector from "math/Vector";
    import Layer from "core/Layer";
    import ActionList from "animation/ActionList";
    export { Matrix, Vector, Layer, ActionList };
}
