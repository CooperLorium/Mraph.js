declare module "animation/Event" {
    export default class Event {
        /**
         * @constructor
         * @param {object} config
         * @return {Action}
         */
        constructor(startTime?: number, stopTime?: number, { start, stop, update, curve, }?: {
            start?: () => void;
            stop?: () => void;
            update?: () => void;
            curve?: (t: any) => any;
        });
        /**
         * @type {number}
         */
        startTime: number;
        /**
         * @type {number}
         */
        stopTime: number;
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
         * @type {boolean}
         */
        isStarted: boolean;
        /**
         * @type {boolean}
         */
        isStopped: boolean;
        /**
         * @type {number}
         */
        id: number;
        /**
         * Animation curve
         * @param {number} t
         * @returns {number}
         */
        curve: (t: number) => number;
        /**
         * trigger this event by current time
         * @param {number} now - the current time
         * @return {void}
         */
        execute(now: number): void;
    }
}
declare module "animation/SpecialEvent" {
    /**
     * infinity event or global event
     */
    export default class SpecialEvent {
        /**
         * @param {Function} updater
         */
        constructor(updater: Function);
        /**
         * @type {Function}
         */
        update: Function;
        /**
         * @type {number}
         */
        id: number;
        /**
         * trigger this event
         */
        execute(): void;
    }
}
declare module "animation/Timeline" {
    export default class Timeline {
        /**
         * Linear function
         * @param {number} t - process, 0 to 1
         * @returns {number}
         */
        static linear: (t: number) => number;
        /**
         * Quadratic ease in function
         * @param {number} t - process, 0 to 1
         * @returns {number}
         */
        static easeInQuad: (t: number) => number;
        /**
         * Quadratic ease out function
         * @param {number} t - process, 0 to 1
         * @returns {number}
         */
        static easeOutQuad: (t: number) => number;
        /**
         * Quadratic ease in out function
         * @param {number} t - process, 0 to 1
         * @returns {number}
         */
        static easeInOutQuad: (t: number) => number;
        /**
         * Cubic ease in function
         * @param {number} t - process, 0 to 1
         * @returns {number}
         */
        static easeInCubic: (t: number) => number;
        /**
         * Cubic ease out function
         * @param {number} t - process, 0 to 1
         * @returns {number}
         */
        static easeOutCubic: (t: number) => number;
        /**
         * Cubic ease in out function
         * @param {number} t - process, 0 to 1
         * @returns {number}
         */
        static easeInOutCubic: (t: number) => number;
        /**
         * Sine ease in function
         * @param {number} t - process, 0 to 1
         * @returns {number}
         */
        static easeInSine: (t: number) => number;
        /**
         * Sine ease out function
         * @param {number} t - process, 0 to 1
         * @returns {number}
         */
        static easeOutSine: (t: number) => number;
        /**
         * Sine ease in out function
         * @param {number} t - process, 0 to 1
         * @returns {number}
         */
        static easeInOutSine: (t: number) => number;
        /**
         * Bounce ease in function
         * @param {number} t - process, 0 to 1
         * @returns {number}
         */
        static easeInBounce: (t: number) => number;
        /**
         * Bounce ease out function
         * @param {number} t - process, 0 to 1
         * @returns {number}
         */
        static easeOutBounce: (t: number) => number;
        /**
         * Bounce ease in out function
         * @param {number} t - process, 0 to 1
         * @returns {number}
         */
        static easeInOutBounce: (t: number) => number;
        /**
         * A short string to describe state
         * @type {string}
         */
        state: string;
        /**
         * list for events to be called
         * @type {Event[]}
         */
        events: Event[];
        /**
         * list for evnets which would be called whenever timeline is active
         * @type {SpecialEvent[]}
         */
        globalEvents: SpecialEvent[];
        /**
         * list for events that would always be called,
         * those events will keep this timeline active
         * @type {SpecialEvent[]}
         */
        infinityEvents: SpecialEvent[];
        /**
         * Returns value of requsetAnimationFrame()
         * @type {number | null}
         */
        clock: number | null;
        /**
         * @type {number}
         */
        _maxTime: number;
        /**
         * @type {number}
         */
        _minTime: number;
        /**
         * @type {number}
         */
        current: number;
        /**
         * @type {number}
         */
        fps: number;
        /**
         * Add an event to this timeline.
         * @param {Number} start
         * @param {Number} stop
         * @param {object} handle
         * @param {object} config
         * @return {Event}
         */
        add(startTime: any, stopTime: any, { update, start, stop, updateMax, updateMin, curve, }?: object): Event;
        /**
         * Add a one-time-only event.
         * @param {number} at
         * @param {Function} handler
         */
        once(at: number, handler: Function): Event;
        /**
         * Add an event to event list following last event.
         * @param {Number} hold
         * @param {object} config
         * @return {this}
         */
        addFollow(hold: number, config: object): this;
        /**
         * Add an event beginning at the earliest time and concluding at the latest time.
         * @param {object} config
         * @returns {this}
         */
        addWhole(handler: any, config: object): this;
        /**
         * Add a global event, this event will be called whenever timeline is active。
         * If there is an infinity event attached to this timeline, it would behaved like infinity events, otherwise it would behaved like whole events.
         * @param {Function} handler
         * @returns {this}
         */
        addGlobal(handler: Function): this;
        /**
         * Add an infinity event
         * @param {Function} handler
         * @returns {this}
         */
        addInfinity(handler: Function): this;
        /**
         * Delete an event from this timeline
         * @param {object | number} target
         */
        delete(target: object | number): void;
        /**
         * Delete an event accroding to its id
         * @param {number} id
         */
        deleteById(id: number): void;
        /**
         * start palying animation
         * @returns {void}
         */
        play(): void;
        /**
         * trigger events by current time
         */
        process(): void;
        /**
         * Stop palying aniamtion
         */
        pause(): void;
        set maxTime(val: number);
        get maxTime(): number;
        set minTime(val: number);
        get minTime(): number;
        get allStopped(): boolean;
    }
    import Event from "animation/Event";
    import SpecialEvent from "animation/SpecialEvent";
}
declare module "math/math_func" {
    /**
     * sigmoid function
     * @param {number} x
     * @returns {number}
     */
    export function sigmoid(x: number): number;
    /**
     * get mean value from a set numbers
     * @param  {...number} nums
     * @returns {number}
     */
    export function mean(...nums: number[]): number;
    /**
     * Lerp function
     * @param {number} from
     * @param {number} to
     * @param {number} p percent
     * @returns {number}
     */
    export function lerp(from: number, to: number, p: number): number;
    /**
     * Lerp between two arrays
     * @param {number[]} from
     * @param {number[]} to
     * @param {number} p percent
     * @returns {number[]}
     */
    export function lerpArray(from: number[], to: number[], p: number): number[];
    export function linear(x: number): number;
}
declare module "math/Vector" {
    export default class Vector extends Array<any> {
        /**
         * Lerp between two vectors
         * @param {Vector} from
         * @param {Vector} to
         * @param {number} p percent
         * @returns {Vector}
         */
        static lerp(from: Vector, to: Vector, p: number): Vector;
        /**
         * @param {*} obj
         * @returns {boolean}
         */
        static isInstance(obj: any): boolean;
        /**
         * @param {number} row
         * @param {number} n
         * @returns {Vector}
         */
        static fromRow(row: number, n?: number): Vector;
        /**
         * Creates a Vector from an array-like object
         * @param {Array | Vector} arr
         * @returns {Vector}
         */
        static fromArray(arr: any[] | Vector): Vector;
        /**
         * @param  {...number} nums
         */
        constructor(...nums: number[]);
        /**
         * mult a scalar
         * @param {number} num
         * @returns {Vector}
         */
        mult(num: number): Vector;
        /**
         * returns mat.mult(this)
         * @param {Matrix} mat
         * @returns {Vector}
         */
        trans(mat: Matrix): Vector;
        /**
         * @param {Vector} vec
         * @returns {number}
         */
        dot(vec: Vector): number;
        /**
         * returns cross product of this vector and vec
         * @param {Vector} vec
         * @returns
         */
        cross(vec: Vector): number | Vector;
        /**
         * returns hadamard product of this vector and vec
         * @param {Vector} vec
         * @returns {Vector}
         */
        elMult(vec: Vector): Vector;
        /**
         * divide by a number
         * @param {number} num
         */
        divide(num: number): Vector;
        /**
         * @param {Vector} vec
         * @returns {Vector}
         */
        add(vec: Vector): Vector;
        /**
         * @param {Vector} vec
         * @returns {Vector}
         */
        minus(vec: Vector): Vector;
        /**
         * Project to another vector
         * @param {Vector} vec
         * @returns {Vector}
         */
        project(vec: Vector): Vector;
        /**
         * normalize this vector
         * @returns {Vector}
         */
        normal(): Vector;
        /**
         * returns linear interpolation results
         * @param {Vector} to
         * @param {number} p percent
         * @returns {Vector}
         */
        lerp(to: Vector, p: number): Vector;
        /**
         * return a deep copy clone of this vector
         * @returns {Vector}
         */
        clone(): Vector;
        /**
         * copy values from another vector
         */
        copy(vec: any): this;
        /**
         * print this vertor on the console
         */
        print(): void;
        /**
         * @returns {Matrix}
         */
        toMatrix(): Matrix;
        /**
         * @type {number}
         */
        set x(val: number);
        /**
         * @type {number}
         */
        get x(): number;
        0: number;
        /**
         * @type {number}
         */
        set y(val: number);
        /**
         * @type {number}
         */
        get y(): number;
        1: number;
        /**
         * @type {number}
         */
        set z(val: number);
        /**
         * @type {number}
         */
        get z(): number;
        2: number;
        /**
         * @param {number} val
         */
        set norm(val: number);
        /**
         * @type {number}
         */
        get norm(): number;
        /**
         * @type {number}
         */
        get row(): number;
    }
    import Matrix from "math/Matrix";
}
declare module "math/Color" {
    export default class Color extends Vector {
        static fromHex(hex: any): Color;
        static fromHexStr(str: any): Color;
        static lerpRGBA(from: any, to: any, p: any): number[];
        static isInstance(obj: any): boolean;
        /**
         * @param {number} [r=0]
         * @param {number} [g=0]
         * @param {number} [b=0]
         * @param {number} [a=1]
         */
        constructor(r?: number, g?: number, b?: number, a?: number);
        toArray(): this[number][];
        toIntRGBA(): Color;
        toRGBAStr(): string;
        toIntRGBAStr(): string;
        set r(val: number);
        get r(): number;
        set g(val: number);
        get g(): number;
        set b(val: number);
        get b(): number;
        set a(val: any);
        get a(): any;
        3: any;
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
    /**
     * @param {Object} obj
     * @returns {Object}
     */
    export function deepCopy(obj: any): any;
}
declare module "math/Matrix" {
    export default class Matrix extends Array<any> {
        /**
         * @param {*} obj
         * @returns {boolean}
         */
        static isInstance(obj: any): boolean;
        /**
         * create zeros from shape
         * @param {number} column
         * @param {number} row
         * @returns {Matrix}
         */
        static zeros(row: number, column: number): Matrix;
        /**
         * @param {number} n
         * the number of columns and rows
         * @returns {Matrix}
         */
        static identity(n: number): Matrix;
        /**
         * @param {number} row
         * @param {number} column
         * @param {number} n
         * @returns {Matrix}
         *
         * @example
         * Matrix.from(2,1,3);
         * // returns new Matrix(
         * //     [3],
         * //     [3]
         * // )
         */
        static from(row: number, column: number, n: number): Matrix;
        /**
         * returns a rotation matrix
         * @param {number} ang
         * the rotate angle
         * @param {number} [n = 4]
         * Specifies the number of rows and columns of the return matrix
         * Available numbers are 3 or 4
         * @returns {Matrix}
         */
        static rotateX(ang: number, n?: number): Matrix;
        /**
         * returns a rotation matrix
         * @param {number} ang
         * the rotate angle
         * @param {number} [n = 4]
         * Specifies the number of rows and columns of the return matrix
         * Available numbers are 3 or 4
         * @returns {Matrix}
         */
        static rotateY(ang: number, n?: number): Matrix;
        /**
         * returns a rotation matrix
         * @param {number} ang
         * the rotate angle
         * @param {number} [n = 4]
         * Specifies the number of rows and columns of the return matrix
         * Available numbers are 3 or 4
         * @returns {Matrix}
         */
        static rotateZ(ang: number, n?: number): Matrix;
        /**
         * returns a rotation matrix to rotate on given axis
         * @param {Vector} axis
         * the axis to rotate on
         * @param {number} angle
         * the rotate angle
         * @param {number} n
         */
        static rotateOn(axis: Vector, angle: number, n?: number): Matrix;
        /**
         * returns a scale matrix
         * @param {number} x scale ratio at x direction
         * @param {number} y scale ratio at y direction
         * @param {number} z scale ratio at z direction
         * @param {number} [n=4] Specifies the number of rows and columns of the return matrix.
         *                       Available numbers are 3 or 4.
         * @returns
         */
        static scale(x: number, y: number, z: number, n?: number): Matrix;
        /**
         * return a 4*4 translation Matrix
         * @param {number} x
         * @param {number} y
         * @param {number} z
         * @returns {Matrix}
         */
        static translation(x: number, y: number, z: number): Matrix;
        /**
         * @param {...number[]} source
         * @return {Matrix}
         */
        constructor(...source: number[][]);
        /**
         * mult a vector, matrix or scalar
         * @param {Matrix} mat
         * @returns {Matrix}
         */
        mult(mat: Matrix): Matrix;
        /**
         * @param {Matrix} mat
         * @returns {Matrix}
         */
        trans(mat: Matrix): Matrix;
        /**
         * mult a scalar
         * @param {number} num
         * @returns {Matrix}
         */
        multNum(num: number): Matrix;
        /**
         * returns hadamard product of this matrix and mat
         * @param {Matrix} mat
         * @returns {Matrix}
         */
        elMult(mat: Matrix): Matrix;
        /**
         *
         * @param {Matrix} mat
         * @returns {Matrix}
         */
        add(mat: Matrix): Matrix;
        /**
         * @param {Matrix} mat
         * @returns {Matrix}
         */
        minus(mat: Matrix): Matrix;
        /**
         * return a deep copy clone of this matrix
         * @returns {Matrix}
         */
        clone(): Matrix;
        /**
         * copy value from another matrix
         * @param {Matrix} mat
         */
        copy(mat: Matrix): this;
        /**
         * resize this matrix with a number to fill
         * @param {number} row
         * @param {number} column
         * @param {number} [n=0]
         */
        resize(row: number, column: number, n?: number): Matrix;
        /**
         * print this matrix on the console
         */
        print(): void;
        /**
         * Returns a vector constructed by flattening this matrix
         * @returns {Vector}
         */
        toVector(): Vector;
        /**
         * @param {number} val
         */
        set norm(val: number);
        /**
         * @returns {number} F-norm of this matrix
         */
        get norm(): number;
        /**
         * return transpose of this matrix
         * @returns {Matrix}
         */
        get T(): Matrix;
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
declare module "constants/glenum" {
    export const DEPTH_BUFFER_BIT: 256;
    export const STENCIL_BUFFER_BIT: 1024;
    export const COLOR_BUFFER_BIT: 16384;
    export const POINTS: 0;
    export const LINES: 1;
    export const LINE_LOOP: 2;
    export const LINE_STRIP: 3;
    export const TRIANGLES: 4;
    export const TRIANGLE_STRIP: 5;
    export const TRIANGLE_FAN: 6;
    export const ZERO: 0;
    export const ONE: 1;
    export const SRC_COLOR: 768;
    export const ONE_MINUS_SRC_COLOR: 769;
    export const SRC_ALPHA: 770;
    export const ONE_MINUS_SRC_ALPHA: 771;
    export const DST_ALPHA: 772;
    export const ONE_MINUS_DST_ALPHA: 773;
    export const DST_COLOR: 774;
    export const ONE_MINUS_DST_COLOR: 775;
    export const SRC_ALPHA_SATURATE: 776;
    export const FUNC_ADD: 32774;
    export const BLEND_EQUATION: 32777;
    export const BLEND_EQUATION_RGB: 32777;
    export const BLEND_EQUATION_ALPHA: 34877;
    export const FUNC_SUBTRACT: 32778;
    export const FUNC_REVERSE_SUBTRACT: 32779;
    export const BLEND_DST_RGB: 32968;
    export const BLEND_SRC_RGB: 32969;
    export const BLEND_DST_ALPHA: 32970;
    export const BLEND_SRC_ALPHA: 32971;
    export const CONSTANT_COLOR: 32769;
    export const ONE_MINUS_CONSTANT_COLOR: 32770;
    export const CONSTANT_ALPHA: 32771;
    export const ONE_MINUS_CONSTANT_ALPHA: 32772;
    export const BLEND_COLOR: 32773;
    export const ARRAY_BUFFER: 34962;
    export const ELEMENT_ARRAY_BUFFER: 34963;
    export const ARRAY_BUFFER_BINDING: 34964;
    export const ELEMENT_ARRAY_BUFFER_BINDING: 34965;
    export const STREAM_DRAW: 35040;
    export const STATIC_DRAW: 35044;
    export const DYNAMIC_DRAW: 35048;
    export const BUFFER_SIZE: 34660;
    export const BUFFER_USAGE: 34661;
    export const CURRENT_VERTEX_ATTRIB: 34342;
    export const FRONT: 1028;
    export const BACK: 1029;
    export const FRONT_AND_BACK: 1032;
    export const CULL_FACE: 2884;
    export const BLEND: 3042;
    export const DITHER: 3024;
    export const STENCIL_TEST: 2960;
    export const DEPTH_TEST: 2929;
    export const SCISSOR_TEST: 3089;
    export const POLYGON_OFFSET_FILL: 32823;
    export const SAMPLE_ALPHA_TO_COVERAGE: 32926;
    export const SAMPLE_COVERAGE: 32928;
    export const NO_ERROR: 0;
    export const INVALID_ENUM: 1280;
    export const INVALID_VALUE: 1281;
    export const INVALID_OPERATION: 1282;
    export const OUT_OF_MEMORY: 1285;
    export const CW: 2304;
    export const CCW: 2305;
    export const LINE_WIDTH: 2849;
    export const ALIASED_POINT_SIZE_RANGE: 33901;
    export const ALIASED_LINE_WIDTH_RANGE: 33902;
    export const CULL_FACE_MODE: 2885;
    export const FRONT_FACE: 2886;
    export const DEPTH_RANGE: 2928;
    export const DEPTH_WRITEMASK: 2930;
    export const DEPTH_CLEAR_VALUE: 2931;
    export const DEPTH_FUNC: 2932;
    export const STENCIL_CLEAR_VALUE: 2961;
    export const STENCIL_FUNC: 2962;
    export const STENCIL_FAIL: 2964;
    export const STENCIL_PASS_DEPTH_FAIL: 2965;
    export const STENCIL_PASS_DEPTH_PASS: 2966;
    export const STENCIL_REF: 2967;
    export const STENCIL_VALUE_MASK: 2963;
    export const STENCIL_WRITEMASK: 2968;
    export const STENCIL_BACK_FUNC: 34816;
    export const STENCIL_BACK_FAIL: 34817;
    export const STENCIL_BACK_PASS_DEPTH_FAIL: 34818;
    export const STENCIL_BACK_PASS_DEPTH_PASS: 34819;
    export const STENCIL_BACK_REF: 36003;
    export const STENCIL_BACK_VALUE_MASK: 36004;
    export const STENCIL_BACK_WRITEMASK: 36005;
    export const VIEWPORT: 2978;
    export const SCISSOR_BOX: 3088;
    export const COLOR_CLEAR_VALUE: 3106;
    export const COLOR_WRITEMASK: 3107;
    export const UNPACK_ALIGNMENT: 3317;
    export const PACK_ALIGNMENT: 3333;
    export const MAX_TEXTURE_SIZE: 3379;
    export const MAX_VIEWPORT_DIMS: 3386;
    export const SUBPIXEL_BITS: 3408;
    export const RED_BITS: 3410;
    export const GREEN_BITS: 3411;
    export const BLUE_BITS: 3412;
    export const ALPHA_BITS: 3413;
    export const DEPTH_BITS: 3414;
    export const STENCIL_BITS: 3415;
    export const POLYGON_OFFSET_UNITS: 10752;
    export const POLYGON_OFFSET_FACTOR: 32824;
    export const TEXTURE_BINDING_2D: 32873;
    export const SAMPLE_BUFFERS: 32936;
    export const SAMPLES: 32937;
    export const SAMPLE_COVERAGE_VALUE: 32938;
    export const SAMPLE_COVERAGE_INVERT: 32939;
    export const COMPRESSED_TEXTURE_FORMATS: 34467;
    export const DONT_CARE: 4352;
    export const FASTEST: 4353;
    export const NICEST: 4354;
    export const GENERATE_MIPMAP_HINT: 33170;
    export const BYTE: 5120;
    export const UNSIGNED_BYTE: 5121;
    export const SHORT: 5122;
    export const UNSIGNED_SHORT: 5123;
    export const INT: 5124;
    export const UNSIGNED_INT: 5125;
    export const FLOAT: 5126;
    export const DEPTH_COMPONENT: 6402;
    export const ALPHA: 6406;
    export const RGB: 6407;
    export const RGBA: 6408;
    export const LUMINANCE: 6409;
    export const LUMINANCE_ALPHA: 6410;
    export const UNSIGNED_SHORT_4_4_4_4: 32819;
    export const UNSIGNED_SHORT_5_5_5_1: 32820;
    export const UNSIGNED_SHORT_5_6_5: 33635;
    export const FRAGMENT_SHADER: 35632;
    export const VERTEX_SHADER: 35633;
    export const MAX_VERTEX_ATTRIBS: 34921;
    export const MAX_VERTEX_UNIFORM_VECTORS: 36347;
    export const MAX_VARYING_VECTORS: 36348;
    export const MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661;
    export const MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660;
    export const MAX_TEXTURE_IMAGE_UNITS: 34930;
    export const MAX_FRAGMENT_UNIFORM_VECTORS: 36349;
    export const SHADER_TYPE: 35663;
    export const DELETE_STATUS: 35712;
    export const LINK_STATUS: 35714;
    export const VALIDATE_STATUS: 35715;
    export const ATTACHED_SHADERS: 35717;
    export const ACTIVE_UNIFORMS: 35718;
    export const ACTIVE_ATTRIBUTES: 35721;
    export const SHADING_LANGUAGE_VERSION: 35724;
    export const CURRENT_PROGRAM: 35725;
    export const NEVER: 512;
    export const LESS: 513;
    export const EQUAL: 514;
    export const LEQUAL: 515;
    export const GREATER: 516;
    export const NOTEQUAL: 517;
    export const GEQUAL: 518;
    export const ALWAYS: 519;
    export const KEEP: 7680;
    export const REPLACE: 7681;
    export const INCR: 7682;
    export const DECR: 7683;
    export const INVERT: 5386;
    export const INCR_WRAP: 34055;
    export const DECR_WRAP: 34056;
    export const VENDOR: 7936;
    export const RENDERER: 7937;
    export const VERSION: 7938;
    export const NEAREST: 9728;
    export const LINEAR: 9729;
    export const NEAREST_MIPMAP_NEAREST: 9984;
    export const LINEAR_MIPMAP_NEAREST: 9985;
    export const NEAREST_MIPMAP_LINEAR: 9986;
    export const LINEAR_MIPMAP_LINEAR: 9987;
    export const TEXTURE_MAG_FILTER: 10240;
    export const TEXTURE_MIN_FILTER: 10241;
    export const TEXTURE_WRAP_S: 10242;
    export const TEXTURE_WRAP_T: 10243;
    export const TEXTURE_2D: 3553;
    export const TEXTURE: 5890;
    export const TEXTURE_CUBE_MAP: 34067;
    export const TEXTURE_BINDING_CUBE_MAP: 34068;
    export const TEXTURE_CUBE_MAP_POSITIVE_X: 34069;
    export const TEXTURE_CUBE_MAP_NEGATIVE_X: 34070;
    export const TEXTURE_CUBE_MAP_POSITIVE_Y: 34071;
    export const TEXTURE_CUBE_MAP_NEGATIVE_Y: 34072;
    export const TEXTURE_CUBE_MAP_POSITIVE_Z: 34073;
    export const TEXTURE_CUBE_MAP_NEGATIVE_Z: 34074;
    export const MAX_CUBE_MAP_TEXTURE_SIZE: 34076;
    export const TEXTURE0: 33984;
    export const TEXTURE1: 33985;
    export const TEXTURE2: 33986;
    export const TEXTURE3: 33987;
    export const TEXTURE4: 33988;
    export const TEXTURE5: 33989;
    export const TEXTURE6: 33990;
    export const TEXTURE7: 33991;
    export const TEXTURE8: 33992;
    export const TEXTURE9: 33993;
    export const TEXTURE10: 33994;
    export const TEXTURE11: 33995;
    export const TEXTURE12: 33996;
    export const TEXTURE13: 33997;
    export const TEXTURE14: 33998;
    export const TEXTURE15: 33999;
    export const TEXTURE16: 34000;
    export const TEXTURE17: 34001;
    export const TEXTURE18: 34002;
    export const TEXTURE19: 34003;
    export const TEXTURE20: 34004;
    export const TEXTURE21: 34005;
    export const TEXTURE22: 34006;
    export const TEXTURE23: 34007;
    export const TEXTURE24: 34008;
    export const TEXTURE25: 34009;
    export const TEXTURE26: 34010;
    export const TEXTURE27: 34011;
    export const TEXTURE28: 34012;
    export const TEXTURE29: 34013;
    export const TEXTURE30: 34014;
    export const TEXTURE31: 34015;
    export const ACTIVE_TEXTURE: 34016;
    export const REPEAT: 10497;
    export const CLAMP_TO_EDGE: 33071;
    export const MIRRORED_REPEAT: 33648;
    export const FLOAT_VEC2: 35664;
    export const FLOAT_VEC3: 35665;
    export const FLOAT_VEC4: 35666;
    export const INT_VEC2: 35667;
    export const INT_VEC3: 35668;
    export const INT_VEC4: 35669;
    export const BOOL: 35670;
    export const BOOL_VEC2: 35671;
    export const BOOL_VEC3: 35672;
    export const BOOL_VEC4: 35673;
    export const FLOAT_MAT2: 35674;
    export const FLOAT_MAT3: 35675;
    export const FLOAT_MAT4: 35676;
    export const SAMPLER_2D: 35678;
    export const SAMPLER_CUBE: 35680;
    export const VERTEX_ATTRIB_ARRAY_ENABLED: 34338;
    export const VERTEX_ATTRIB_ARRAY_SIZE: 34339;
    export const VERTEX_ATTRIB_ARRAY_STRIDE: 34340;
    export const VERTEX_ATTRIB_ARRAY_TYPE: 34341;
    export const VERTEX_ATTRIB_ARRAY_NORMALIZED: 34922;
    export const VERTEX_ATTRIB_ARRAY_POINTER: 34373;
    export const VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 34975;
    export const IMPLEMENTATION_COLOR_READ_TYPE: 35738;
    export const IMPLEMENTATION_COLOR_READ_FORMAT: 35739;
    export const COMPILE_STATUS: 35713;
    export const LOW_FLOAT: 36336;
    export const MEDIUM_FLOAT: 36337;
    export const HIGH_FLOAT: 36338;
    export const LOW_INT: 36339;
    export const MEDIUM_INT: 36340;
    export const HIGH_INT: 36341;
    export const FRAMEBUFFER: 36160;
    export const RENDERBUFFER: 36161;
    export const RGBA4: 32854;
    export const RGB5_A1: 32855;
    export const RGBA8: 32856;
    export const RGB565: 36194;
    export const DEPTH_COMPONENT16: 33189;
    export const STENCIL_INDEX8: 36168;
    export const DEPTH_STENCIL: 34041;
    export const RENDERBUFFER_WIDTH: 36162;
    export const RENDERBUFFER_HEIGHT: 36163;
    export const RENDERBUFFER_INTERNAL_FORMAT: 36164;
    export const RENDERBUFFER_RED_SIZE: 36176;
    export const RENDERBUFFER_GREEN_SIZE: 36177;
    export const RENDERBUFFER_BLUE_SIZE: 36178;
    export const RENDERBUFFER_ALPHA_SIZE: 36179;
    export const RENDERBUFFER_DEPTH_SIZE: 36180;
    export const RENDERBUFFER_STENCIL_SIZE: 36181;
    export const FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 36048;
    export const FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 36049;
    export const FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 36050;
    export const FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 36051;
    export const COLOR_ATTACHMENT0: 36064;
    export const DEPTH_ATTACHMENT: 36096;
    export const STENCIL_ATTACHMENT: 36128;
    export const DEPTH_STENCIL_ATTACHMENT: 33306;
    export const NONE: 0;
    export const FRAMEBUFFER_COMPLETE: 36053;
    export const FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 36054;
    export const FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 36055;
    export const FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 36057;
    export const FRAMEBUFFER_UNSUPPORTED: 36061;
    export const FRAMEBUFFER_BINDING: 36006;
    export const RENDERBUFFER_BINDING: 36007;
    export const MAX_RENDERBUFFER_SIZE: 34024;
    export const INVALID_FRAMEBUFFER_OPERATION: 1286;
    export const UNPACK_FLIP_Y_WEBGL: 37440;
    export const UNPACK_PREMULTIPLY_ALPHA_WEBGL: 37441;
    export const CONTEXT_LOST_WEBGL: 37442;
    export const UNPACK_COLORSPACE_CONVERSION_WEBGL: 37443;
    export const BROWSER_DEFAULT_WEBGL: 37444;
}
declare module "core/WebGL/ProgramManager" {
    export default class ProgramManager {
        programPool: {};
        setProgram(material: any, gl: any, scene: any): void;
        getProgramKey(material: any): any;
    }
}
declare module "utils/MraphError" {
    export default class MraphError {
        static error(msg: any): void;
        static warn(msg: any): void;
    }
}
declare module "core/WebGL/WebGLRenderer" {
    export default class WebGLRenderer {
        constructor(canvas: any, contextConfig?: {});
        /**
         * HTML canvas eLement
         * @type {HTMLCanvasElement}
         */
        canvas: HTMLCanvasElement;
        /**
         * @type {ProgramManager}
         */
        programManager: ProgramManager;
        /**
         * rendering context
         * @type {WebGLRenderingContext | WebGL2RenderingContext}
         */
        gl: WebGLRenderingContext | WebGL2RenderingContext;
        /**
         * A set of vaos
         * @type {WebGLVertexArrayObject[]}
         */
        VAOs: WebGLVertexArrayObject[];
        /**
         * usage of this renderer, default to be gl.STATIC_DRAW
         * @type {number}
         */
        usage: number;
        /**
         * whether to use depthTest, default to be true
         */
        _depthTest: boolean;
        /**
         * whether to use depthMask, default to be true
         */
        _depthMask: boolean;
        EXT_VAO: WebGLVertexArrayObject;
        set depthTest(bool: boolean);
        get depthTest(): boolean;
        set depthMask(bool: boolean);
        get depthMask(): boolean;
        /**
         * Renders the scene
         * @param {Geometry} mesh
         * @param {Camera} camera
         * @param {Object} surroundings
         */
        render(mesh: Geometry, camera: Camera, surroundings?: any): void;
        /**
         * Clears the canvas with a certain colour
         * @param {number} r
         * @param {number} g
         * @param {number} b
         * @param {number} a
         */
        clear(r: number, g: number, b: number, a: number): void;
        /**
         * Resize the canvas
         * @param {number} width
         * @param {number} height
         */
        resize(width: number, height: number): void;
        /**
         * Private method, creates a vertex array object
         * @returns {WebGLVertexArrayObject}
         */
        _createVAO(): WebGLVertexArrayObject;
        /**
         * Private method, binds a vertex array object
         * @returns {WebGLVertexArrayObject}
         */
        _bindVAO(VAO: any): WebGLVertexArrayObject;
        /**
         * Private method, gets a webgl extension
         * @returns {WebGLVertexArrayObject}
         */
        _getExtension(name: any): WebGLVertexArrayObject;
    }
    import ProgramManager from "core/WebGL/ProgramManager";
}
declare module "core/Camera" {
    export default class Camera {
        center: Vector;
        rotation: Vector;
        up: Vector;
        projectionMat: Matrix;
        viewMat: Matrix;
        update(): void;
        perspective({ fov, near, far, aspect }?: {
            fov?: number;
            near?: number;
            far?: number;
            aspect?: number;
        }): this;
        near: number;
        far: number;
        ortho({ left, right, bottom, top, near, far, }?: {
            left?: number;
            right?: number;
            bottom?: number;
            top?: number;
            near?: number;
            far?: number;
        }): this;
        lookAt(target: any): this;
        matrix: Matrix;
    }
    import Vector from "math/Vector";
    import Matrix from "math/Matrix";
}
declare module "extra/OrbitControl" {
    export default class OrbitControl {
        constructor(camera: any, { element }?: {
            element?: Document;
        });
        center: Vector;
        _element: Document;
        enableZoom: boolean;
        radius: number;
        scale: number;
        zoomSpeed: number;
        enableRotate: boolean;
        theta: number;
        phi: number;
        phiMax: number;
        phiMin: number;
        deltaAngleMax: number;
        rotateSpeed: number;
        rotateEase: number;
        enableMove: boolean;
        moveSpeed: number;
        moveEase: number;
        camera: any;
        set element(el: Document);
        get element(): Document;
        update(): void;
        rotate(deltaPhi: any, deltaTheta: any): void;
        zoom(scale: any): void;
        move(deltaX: any, deltaY: any): void;
        handleTouchStart(e: any): void;
        handleTouchMove(e: any): void;
        handleTouchEnd(e: any): void;
        handleMouseDown(e: any): void;
        handleMouseMove(e: any): void;
        handleMouseUp(): void;
        handleWheel(e: any): void;
    }
    import Vector from "math/Vector";
}
declare module "constants/colors" {
    export const WHITE: Color;
    export const BLACK: Color;
    export const RED_A: Color;
    export const RED_B: Color;
    export const RED_C: Color;
    export const RED_D: Color;
    export const RED_E: Color;
    export const RED: Color;
    export const BLUE_A: Color;
    export const BLUE_B: Color;
    export const BLUE_C: Color;
    export const BLUE_D: Color;
    export const BLUE_E: Color;
    export const BLUE: Color;
    export const YELLOW_A: Color;
    export const YELLOW_B: Color;
    export const YELLOW_C: Color;
    export const YELLOW_D: Color;
    export const YELLOW_E: Color;
    export const YELLOW: Color;
    export const GREEN_A: Color;
    export const GREEN_B: Color;
    export const GREEN_C: Color;
    export const GREEN_D: Color;
    export const GREEN_E: Color;
    export const GREEN: Color;
    export const GRAY_A: Color;
    export const GRAY_B: Color;
    export const GRAY_C: Color;
    export const GRAY_D: Color;
    export const GRAY_E: Color;
    export const GRAY: Color;
    export const COOPER_ORANGE: Color;
    export const SEIYA_PINK: Color;
    import Color from "math/Color";
}
declare module "core/WebGL/WebGLProgram" {
    export default class Program {
        constructor(gl: any, { vs, fs }?: {
            vs?: string;
            fs?: string;
        });
        /**
         * A set of variable locations
         * @type {Map}
         */
        locations: Map<any, any>;
        gl: any;
        vs: any;
        fs: any;
        program: any;
        /**
         * Uses this program for rendering
         */
        use(): void;
        /**
         * Sets a uniform variable
         * @param {string} name
         * @param {Matrix | Vector | number[]} data
         * @param {number} [n]
         */
        setUniform(name: string, data: Matrix | Vector | number[], n?: number): void;
        /**
         * Initiates a vertex array object
         * @param {Geometry} mesh
         */
        initVAO(mesh: Geometry): void;
    }
}
declare module "material/SlotParser" {
    export function replace(origin: any, name: any, value: any): any;
}
declare module "material/components/GetColorComponent" {
    export default class GetColorComponent {
        compile(vs: any, fs: any, { colorMode }: {
            colorMode: any;
        }): {
            vs: any;
            fs: any;
        };
        passVariables(target: any): void;
    }
}
declare module "material/Material" {
    export default class Material {
        _depthTest: boolean;
        colorMode: string;
        color: import("mraph").Color;
        vertexShader: string;
        fragmentShader: string;
        components: any[];
        beforeRender(): void;
        attachComponent(component: any): void;
        compileComponents(): any;
        passComponentVariables(): void;
        set depthTest(val: boolean);
        get depthTest(): boolean;
    }
}
declare module "material/BasicMaterial" {
    export default class BasicMaterial extends Material {
        vertexShader: any;
        fragmentShader: any;
        initProgram(gl: any): void;
        program: WebGLProgram;
        get depthTest(): boolean;
    }
    import Material from "material/Material";
    import WebGLProgram from "core/WebGL/WebGLProgram";
}
declare module "constants/vectors" {
    export const ORIGIN: Vector;
    export const UP: Vector;
    export const DOWN: Vector;
    export const RIGHT: Vector;
    export const LEFT: Vector;
    export const IN: Vector;
    export const OUT: Vector;
    import Vector from "math/Vector";
}
declare module "light/PointLight" {
    export default class PointLight {
        static isInstance(obj: any): boolean;
        constructor({ center, color, intensity, }?: {
            center?: import("mraph").Vector;
            color?: import("mraph").Color;
            intensity?: number;
        });
        center: import("mraph").Vector;
        color: import("mraph").Color;
        intensity: number;
    }
}
declare module "light/DirectionalLight" {
    export default class DirectionalLight {
        static isInstance(obj: any): boolean;
        constructor({ direction, color, intensity, }?: {
            direction?: import("mraph").Vector;
            color?: import("mraph").Color;
            intensity?: number;
        });
        direction: import("mraph").Vector;
        color: import("mraph").Color;
        intensity: number;
    }
}
declare module "core/Node" {
    export default class Node {
        /**
         * @type {Node | undefined}
         */
        parent: Node | undefined;
        /**
         * A set of children
         * @type {Node[]}
         */
        children: Node[];
        /**
         * local matrix
         * @type {Matrix}
         */
        localMatrix: Matrix;
        /**
         * global matrix
         * @type {Matrix}
         */
        matrix: Matrix;
        /**
         * @type {Vector}
         */
        center: Vector;
        /**
         * @type {Vector}
         */
        rotation: Vector;
        /**
         * @type {Vector}
         */
        scale: Vector;
        /**
         * @param  {...Node} objs
         */
        add(...objs: Node[]): void;
        /**
         * @param  {...Node} objs
         */
        delete(...objs: Node[]): void;
        /**
         * delete all children
         */
        clear(): void;
        /**
         * Set attributes for all children
         * @param {string} key
         * @param {any} value
         */
        set(key: string, value: any): void;
        /**
         * update local matrix
         * @returns {this}
         */
        updateLocalMatrix(): this;
        /**
         * update global matrix
         * @returns {this}
         */
        updateWorldMatrix(): this;
        /**
         * update local matrix, global matrix and children's matrices
         * @returns {this}
         */
        updateMatrix(): this;
    }
    import Matrix from "math/Matrix";
    import Vector from "math/Vector";
}
declare module "core/Layer" {
    export default class Layer {
        constructor({ fullScreen, appendTo, rendererClass, contextConfig, }?: {
            fullScreen?: boolean;
            appendTo?: any;
            rendererClass?: typeof WebGLRenderer;
            contextConfig?: {};
        });
        camera: Camera;
        timeline: Timeline;
        defaultMaterial: BasicMaterial;
        surroundings: {
            pointLights: any[];
            directionalLights: any[];
        };
        scene: Node;
        canvas: HTMLCanvasElement;
        renderer: WebGLRenderer;
        /**
         * Adjust the canvas to the new width and height
         * @param {number} width
         * @param {number} height
         */
        resize(width: number, height: number): void;
        /**
         * Adjust the canvas to full screen
         */
        fillScreen(): void;
        /**
         * append this.canvas to a HTMLElement
         * @param {HTMLElement} el
         * @returns {this}
         */
        appendTo(el: HTMLElement): this;
        /**
         * Adds mobjects, lights to scene
         * @param  {...Mobject | Light} els
         * @returns {this}
         */
        add(...els: (Mobject | Light)[]): this;
        /**
         * Creates a mobject or geometry and automatically add it to the layer
         * @template Mobject
         * @param {Function} Mobject constructor of the mobject you want to create
         * @param  {...any} params
         * @returns {Mobject}
         */
        create<Mobject>(Mobject: Function, ...params: any[]): Mobject;
        /**
         * Deletes mobjects or lgihts
         * @param  {...Mobject | Light} els
         */
        delete(...els: (Mobject | Light)[]): void;
        /**
         * Clears all mobjects and lights
         */
        clear(): void;
        /**
         * Sets attributes for all nodes
         * @param {string} key
         * @param {any} value
         */
        set(key: string, value: any): void;
        /**
         * Adds something to surroundings, e.g. Lights
         * @param {Light} obj
         */
        addSurrounding(obj: Light): void;
        /**
         * Renders scene
         * @returns {this}
         */
        render(): this;
        /**
         * Clears canvas by a color
         * @param {number[] | Color} [color = COLORS.GRAY_E]
         * @returns {this}
         */
        clearCanvas([r, g, b, a]?: number[] | Color): this;
        /**
         * play animation with a refresh color
         * @param {Color} [color = COLORS.GRAY_E]
         * @returns {this}
         */
        play(color?: Color): this;
        /**
         * pause for a while between animations
         * @param {number} [time=1] in seconds
         */
        wait(time?: number): this;
        /**
         * Enables orbit control
         * @returns Control
         */
        enableOrbitControl(): OrbitControl;
    }
    import Camera from "core/Camera";
    import Timeline from "animation/Timeline";
    import BasicMaterial from "material/BasicMaterial";
    import Node from "core/Node";
    import WebGLRenderer from "core/WebGL/WebGLRenderer";
    import OrbitControl from "extra/OrbitControl";
}
declare module "core/Texture" {
    export default class Texture {
        static loadFile(gl: any, src: any): Texture;
        constructor(gl: any, { image, target, flipY, minFilter, magFilter, unit, }?: {
            image: any;
            target?: any;
            flipY?: boolean;
            minFilter?: any;
            magFilter?: any;
            unit?: number;
        });
        gl: any;
        image: any;
        target: any;
        flipY: boolean;
        texture: any;
        unit: number;
        set minFilter(val: any);
        get minFilter(): any;
        set magFilter(val: any);
        get magFilter(): any;
        bind(): void;
        upload(): void;
        get isImgReady(): boolean;
        __minFilter: any;
        __magFilter: any;
    }
}
declare module "extra/Recorder" {
    export default class Recorder {
        /**
         * A simple recorder helps you to recorde videos
         * @param {HTMLCanvasElement} target
         * @param {object} options An object used to define following parameters, optional
         * * mimeType {string} sets mime type of video recorded, optional.
         * * fps {number} sets fps of video recorded, optional.
         * * audioBitsPerSecond {number} The chosen bitrate for the audio component of the media, optional.
         * * videoBitsPerSecond {number} The chosen bitrate for the video component of the media, optional.
         * * bitsPerSecond {number} The chosen bitrate for the audio and video components of the media.
         *                          This can be specified instead of the above two properties.
         *                          If this is specified along with one or the other of the above properties, this will be used for the one that isn't specified.
         */
        constructor(target: HTMLCanvasElement, { mimeType, fps, audioBitsPerSecond, videoBitsPerSecond, bitsPerSecond, }?: object);
        /**
         * Data of video recorded, undefined by default.
         */
        data: any;
        /**
         * Callback function, will be called if data is available.
         */
        onAvailable: () => void;
        target: HTMLCanvasElement;
        recorder: MediaRecorder;
        /**
         * Start recording
         * @returns {this}
         */
        start(): this;
        /**
         * Pause recording
         * @returns {this}
         */
        pause(): this;
        /**
         * Stop recording
         * @returns {this}
         */
        stop(): this;
        /**
         * Download a video if data is available
         * @param {string} name
         * @returns {this}
         */
        download(name?: string): this;
    }
}
declare module "material/CustomMaterial" {
    export default class CustomMaterial extends Material {
        constructor({ vertexShader, fragmentShader }?: {
            vertexShader?: string;
            fragmentShader?: string;
        });
        initProgram(gl: any): void;
        program: WebGLProgram;
    }
    import Material from "material/Material";
    import WebGLProgram from "core/WebGL/WebGLProgram";
}
declare module "material/DepthMaterial" {
    export default class DepthMaterial extends Material {
        vertexShader: any;
        fragmentShader: any;
        initProgram(gl: any): void;
        program: WebGLProgram;
        beforeRender({ camera }: {
            camera: any;
        }): void;
    }
    import Material from "material/Material";
    import WebGLProgram from "core/WebGL/WebGLProgram";
}
declare module "material/LambertMaterial" {
    export default class LambertMaterial extends Material {
        vertexShader: any;
        fragmentShader: any;
        initProgram(gl: any, { surroundings }: {
            surroundings: any;
        }): void;
        program: WebGLProgram;
        beforeRender({ surroundings }: {
            surroundings: any;
        }): void;
    }
    import Material from "material/Material";
    import WebGLProgram from "core/WebGL/WebGLProgram";
}
declare module "math/Quat" {
    export default class Quat extends Array<any> {
        /**
         * Returns [0,0,0,0]
         * @returns {Quat}
         */
        static zeros(): Quat;
        /**
         * Create a quternion from a scalar
         * @param {number} num
         * @returns {Quat}
         */
        static fromScalar(num: number): Quat;
        /**
         * Create a pure quaternion by a vector
         * @param {Vector} vector
         * @returns {Quat}
         */
        static fromVector(vector: Vector): Quat;
        /**
         * Returns a rotation vector
         * @param {Vector} axis
         * @param {number} angle
         * @returns {Vector}
         */
        static rotateOn(axis: Vector, angle: number): Vector;
        /**
         * Rotate a vector by certain axis and angle
         * @param {Vector} vector
         * @param {Vector | string} axis The axis to spin around, could be specified by a vector or a string.
         * @param {number} angle
         * @returns {Vector}
         */
        static rotate(vector: Vector, axis: Vector | string, angle: number): Vector;
        /**
         * @param {number} [x=0]
         * @param {number} [y=0]
         * @param {number} [z=0]
         * @param {number} [w=0]
         */
        constructor(x?: number, y?: number, z?: number, w?: number);
        /**
         * @param {Quat} quat
         * @returns {Quat}
         */
        add(quat: Quat): Quat;
        /**
         * @param {Quat} quat
         * @returns {Quat}
         */
        minus(quat: Quat): Quat;
        /**
         * @param {Quat} quat
         * @returns {Quat}
         */
        mult(quat: Quat): Quat;
        /**
         * @param {number} num
         * @returns {Quat}
         */
        multNum(num: number): Quat;
        /**
         * @param {Quat} quat
         * @returns {Quat}
         */
        dot(quat: Quat): Quat;
        /**
         * print this quaternion on the console
         */
        print(): void;
        /**
         * @param {Quat | number[]} arraylike
         * @returns {this}
         */
        copy(arraylike: Quat | number[]): this;
        /**
         * @param {number} val
         */
        set x(val: number);
        /**
         * @returns {number}
         */
        get x(): number;
        /**
         * @param {number} val
         */
        set y(val: number);
        /**
         * @returns {number}
         */
        get y(): number;
        /**
         * @param {number} val
         */
        set z(val: number);
        /**
         * @returns {number}
         */
        get z(): number;
        /**
         * @param {number} val
         */
        set w(val: number);
        /**
         * @returns {number}
         */
        get w(): number;
        /**
         * @param {number} val
         */
        set norm(val: number);
        /**
         * @returns {number}
         */
        get norm(): number;
        1: number;
        2: number;
        3: number;
        0: number;
        /**
         * Conjugate quaternion
         */
        get C(): Quat;
        /**
         * Inverse quaternion
         */
        get I(): Quat;
        /**
         * returns scalar part of this quternion
         */
        get scalar(): number;
        /**
         * returns vector part of this quternion
         */
        get vector(): Vector;
    }
    import Vector from "math/Vector";
}
declare module "constants/draw_modes" {
    export const POINTS: "POINTS";
    export const LINES: "LINES";
    export const LINE_LOOP: "LINE_LOOP";
    export const LINE_STRIP: "LINE_STRIP";
    export const TRIANGLES: "TRIANGLES";
    export const TRIANGLE_STRIP: "TRIANGLE_STRI";
    export const TRIANGLE_FAN: "TRIANGLE_FAN";
}
declare module "geometry/Geometry" {
    export default class Geometry extends Node {
        /**
         * attribute variables
         * @type {Object}
         */
        attributes: any;
        /**
         * uniform variables
         * @type {Object}
         */
        uniforms: any;
        /**
         * @type {number}
         */
        mode: number;
        /**
         * @type {number | Object}
         */
        indices: number | any;
        /**
         * @type {boolean}
         */
        visible: boolean;
        /**
         * @type {boolean}
         */
        needsUpdate: boolean;
        /**
         * Update variables.
         * Every geometry should have this method,
         * so that it can be updated when needed.
         */
        update(): void;
        /**
         * Merge all children into this geometry.
         * This method assumes all children have and only have three variables, normal, position and color.
         */
        combineChildren(): this;
        /**
         * Merge from another geometry.
         * @param {Geometry} geometry
         * @param {object} config
         * An object used to define following parameters, optional
         * * mergeVertices {boolean} wheather to merge vertices array.
         * * mergeNormals {boolean} wheather to merge normals array.
         * * mergeColors{boolean} wheather to merge colors array.
         * @returns
         */
        merge(geometry: Geometry, { mergeVertices, mergeNormals, mergeColors }?: object): Geometry;
        /**
         * Merge vertices array into this geometry from another.
         * @param {Geometry} geometry
         * @returns {this}
         */
        mergeVertices(geometry: Geometry): this;
        /**
         * Merge colors array into this geometry from another.
         * @param {Geometry} geometry
         * @returns {this}
         */
        mergeColors(geometry: Geometry): this;
        /**
         * Merge normals array into this geometry from another.
         * @param {Geometry} geometry
         * @returns {this}
         */
        mergeNormals(geometry: Geometry): this;
        /**
         * Set value of an attribute variable
         * @param {string} name
         * @param {number[]} data
         * @param {number} [size]
         */
        setAttribute(name: string, data: number[], size?: number): void;
        /**
         * Delete an attribute
         * @param {string} name
         */
        deleteAttribute(name: string): void;
        /**
         * Get value of an attribute variable
         * @param {string} name
         * @param {number[]} data
         * @param {number} n
         */
        getAttributeVal(name: string): any;
        /**
         * Sets a uniform variable
         * @param {string} name
         * @param {number[] | number} data
         * @param {number} size
         */
        setUniform(name: string, data: number[] | number, size: number): void;
        /**
         * Deletes a uniform variable
         * @param {string} name
         */
        deleteUniform(name: string): void;
        /**
         * Gets value of a uniform variable
         * @param {string} name
         * @returns {number[] | number}
         */
        getUniformVal(name: string): number[] | number;
        /**
         * set index
         * @param {number | number[]} data
         */
        setIndex(data: number | number[]): void;
    }
    import Node from "core/Node";
}
declare module "geometry/Plane" {
    export default class Plane extends Geometry {
        constructor({ width, height, normal }?: {
            width?: number;
            height?: number;
            normal?: Vector;
        });
        indices: {
            data: number[];
        };
        width: number;
        height: number;
        normal: Vector;
    }
    import Geometry from "geometry/Geometry";
    import Vector from "math/Vector";
}
declare module "geometry/Box" {
    export default class Box extends Geometry {
        constructor({ width, height, depth }?: {
            width?: number;
            height?: number;
            depth?: number;
        });
        width: number;
        height: number;
        depth: number;
    }
    import Geometry from "geometry/Geometry";
}
declare module "geometry/Segment" {
    export default class Segment extends Geometry {
        constructor(start?: import("mraph").Vector, end?: import("mraph").Vector);
        strokeWidth: number;
        strokeColor: Color;
        normal: import("mraph").Vector;
        indices: number[];
        start: import("mraph").Vector;
        end: import("mraph").Vector;
        get vector(): import("mraph").Vector;
    }
    import Geometry from "geometry/Geometry";
    import Color from "math/Color";
}
declare module "geometry/Sphere" {
    export default class Sphere extends Geometry {
        /**
         * @param {object} config
         * An object used to define following parameters, optional
         * * radius {number[]} sets radius for this sphere
         *
         * * phiStarts{number} sets start angle of azimuth.
         * * phiEnd {number} sets end angle of azimuth.
         * * phiSegment {number} sets segmentation along the azimuth.
         *
         * * thetaStart {number} sets start angle of elevation.
         * * thetaEnd {number} sets end angle of elevation.
         * * thetaSegment {number} sets segmentation along the elevation.
         */
        constructor({ radius, phiStart, phiEnd, phiSegments, thetaStart, thetaEnd, thetaSegments, }?: object);
        radius: any;
        /** azimuth */
        phiStart: any;
        phiEnd: any;
        phiSegments: any;
        /** elevation */
        thetaStart: any;
        thetaEnd: any;
        thetaSegments: any;
    }
    import Geometry from "geometry/Geometry";
}
declare module "geometry/Cylinder" {
    export default class Cylinder extends Geometry {
        /**
         * @param {object} config
         * An object used to define following parameters, optional
         * * radii {number[]} sets radius for each cross section
         * * heightSegments {number | number[]} controls vertical segmentation.
         * *                                    You can use a uniform value for all sections by providing a single number,
         * *                                    or set diffrent values for each subpart by simply providing an array.
         * * phiStarts {number | number[]} sets start angle of azimuth. The usage is just like "heigjtSegments".
         * * phiEnds {number | number[]} sets end angle of azimuth. The usage is just like "heigjtSegments".
         * * phiSegments {number | number[]} sets segmentation along the azimuth. The usage is just like "heigjtSegments".
         * * heights {number | number[]} sets the height for each section. The usage is just like "heigjtSegments".
         * * topCap {boolean} wheather to generate the top cap of this cylinder, default true
         * * bottomCap {boolean} wheather to generate the bottom cap of this cylinder, default true
         */
        constructor({ radii, heightSegments, phiStarts, phiEnds, phiSegments, heights, topCap, bottomCap, }?: object);
        radii: any;
        heightSegments: any;
        heights: any;
        topCap: any;
        bottomCap: any;
        /** azimuth */
        phiStarts: any;
        phiEnds: any;
        phiSegments: any;
    }
    import Geometry from "geometry/Geometry";
}
declare module "mobjects/Mobject" {
    export default class Mobject extends Geometry {
        material: BasicMaterial;
        animate: {
            /**
             * Shifts this mobject to a new place
             * @param {Vector | number[]} pos
             * @param {Object} config
             */
            moveTo: any;
            /**
             * Scales this mobject by a factor
             * @param {Vector | number[]} factor
             * @param {Object} config
             */
            scaleTo: any;
            /**
             * Rotates this mobject around x axis
             * @param {Vector | number[]} factor
             * @param {Object} config
             */
            rotateX: any;
            /**
             * Rotates this mobject around y axis
             * @param {Vector | number[]} factor
             * @param {Object} config
             */
            rotateY: any;
            /**
             * Rotates this mobject around z axis
             * @param {Vector | number[]} factor
             * @param {Object} config
             */
            rotateZ: any;
        };
    }
    import Geometry from "geometry/Geometry";
    import BasicMaterial from "material/BasicMaterial";
}
declare module "mobjects/2D/Mobject2D" {
    export default class Mobject2D extends Mobject {
        points: any[];
        polygons: any[];
        normal: Vector;
        fillColor: Color;
        strokeColor: Color;
        strokeWidth: number;
        lineJoin: string;
        move(point: any): void;
        line(point: any): void;
        arc(radius: any, startAngle: any, endAngle: any, clockwise?: boolean, segments?: number): void;
        fill(): void;
        stroke(): void;
        modifyLineJoin2Miter(target: any): void;
        draw(): void;
        clearGraph(): void;
        clearPath(): void;
        clearBuffer(): void;
        finish(): void;
        setColor(color: any): void;
        animate: any;
        pointwiseTransform(trans: any): void;
    }
    import Mobject from "mobjects/Mobject";
    import Vector from "math/Vector";
    import Color from "math/Color";
}
declare module "mobjects/2D/Arc" {
    export default class Arc extends Mobject2D {
        constructor(startAng?: number, endAng?: number, radius?: number, center?: number[]);
        startAng: number;
        endAng: number;
        radius: number;
        center: number[];
        update(): this;
        draw(): this;
    }
    import Mobject2D from "mobjects/2D/Mobject2D";
}
declare module "mobjects/2D/Point" {
    export default class Point extends Arc {
        /**
         * @param  {Vector | number[] | ...number} position
         */
        constructor(...args: any[]);
        _v: Vector;
        _a: Vector;
        center: any;
        update(): this;
        draw(): this;
        set v(val: Vector);
        get v(): Vector;
        set a(val: Vector);
        get a(): Vector;
        set x(val: any);
        get x(): any;
        set y(val: any);
        get y(): any;
        set z(val: any);
        get z(): any;
    }
    import Arc from "mobjects/2D/Arc";
    import Vector from "math/Vector";
}
declare module "mobjects/2D/Tail" {
    export default class Tail extends Mobject2D {
        constructor(target: any, { maxLength, maxSteps, modifyLine }?: {
            maxLength?: number;
            maxSteps?: number;
            modifyLine?: (line: any, i: any, all: any) => void;
        });
        step: number;
        target: any;
        trail: any[];
        maxLength: number;
        maxSteps: number;
        modifyLine: (line: any, i: any, all: any) => void;
        update(): this;
        draw(): this;
    }
    import Mobject2D from "mobjects/2D/Mobject2D";
}
declare module "mobjects/2D/Line" {
    export default class Line extends Mobject2D {
        /**
         * @param {Point} start
         * @param {Point} end
         */
        constructor(start?: Point, end?: Point);
        indices: {
            data: number[];
        };
        tips: any[];
        tipWidth: number;
        tipLength: number;
        start: Point;
        end: Point;
        update(): this;
        drawTips(): this;
        draw(): this;
        /**
         * return a position where corresponds a precent
         * @param {number} precent
         * @returns
         */
        at(p: any): any;
        /**
         * add a tip to this line
         * @param {number} at
         * @param {Boolean} reverse
         */
        addTip(at: number, reverse?: boolean): void;
        set vector(vec: any);
        get vector(): any;
        set length(val: any);
        get length(): any;
        get slope(): number;
    }
    import Mobject2D from "mobjects/2D/Mobject2D";
    import Point from "mobjects/2D/Point";
}
declare module "mobjects/2D/Arrow" {
    export default class Arrow extends Line {
        constructor(...param: any[]);
    }
    import Line from "mobjects/2D/Line";
}
declare module "mobjects/2D/Axis" {
    export default class Axis extends Line {
        /**
         * Create an Axis from oringin point, direction vector and range
         * @param {Point | Vector} base
         * @param {Vector} dir - direction vector
         * @param {number[]} range - an array to describe range,
         *                           it should be formated like [start, end, unit]
         * @returns
         */
        static fromRange(base: Point | Vector, dir: Vector, range: number[]): Axis;
        constructor(start: any, end: any, { unit }?: {
            unit?: number;
        });
        tickLength: number;
        unit: number;
        update(): this;
        draw(): this;
    }
    import Line from "mobjects/2D/Line";
    import Point from "mobjects/2D/Point";
    import Vector from "math/Vector";
}
declare module "mobjects/2D/FunctionGraph2D" {
    export default class FunctionGraph2D extends Mobject2D {
        constructor({ func, xRange, z }?: {
            func?: (x: any) => any;
            xRange?: number[];
            z?: number;
        });
        xRange: number[];
        func: (x: any) => any;
        z: number;
        update(): this;
        draw(): this;
    }
    import Mobject2D from "mobjects/2D/Mobject2D";
}
declare module "mobjects/3D/Mobject3D" {
    export default class Mobject3D extends Mobject {
        /**
         * Sets the color of this mobject
         * @param {Color} color
         */
        setColor(color: Color): void;
    }
    import Mobject from "mobjects/Mobject";
}
declare module "mobjects/3D/FunctionGraph3D" {
    export default class FunctionGraph3D extends Mobject3D {
        constructor({ xRange, yRange, func, }?: {
            xRange?: number[];
            yRange?: number[];
            func?: (x: any, y: any) => any;
        });
        xRange: number[];
        yRange: number[];
        func: (x: any, y: any) => any;
    }
    import Mobject3D from "mobjects/3D/Mobject3D";
}
declare module "mobjects/2D/Axes" {
    export default class Axes extends Mobject2D {
        constructor({ xRange, yRange, zRange, origin, }?: {
            xRange?: number[];
            yRange?: number[];
            zRange?: number[];
            origin?: Point;
        });
        _tickLength: number;
        origin: Point;
        xAxis: Axis;
        yAxis: Axis;
        zAxis: Axis;
        xRange: number[];
        yRange: number[];
        zRange: number[];
        graphs: any[];
        addTip(): void;
        drawFunction2D(func: any, { step, autoStack }?: {
            step?: number;
            autoStack?: boolean;
        }): FunctionGraph2D;
        drawFunction3D(func: any, { step }?: {
            step?: number;
        }): FunctinoGraph3D;
        set tickLength(val: number);
        get tickLength(): number;
    }
    import Mobject2D from "mobjects/2D/Mobject2D";
    import Point from "mobjects/2D/Point";
    import Axis from "mobjects/2D/Axis";
    import FunctionGraph2D from "mobjects/2D/FunctionGraph2D";
    import FunctinoGraph3D from "mobjects/3D/FunctionGraph3D";
}
declare module "mobjects/2D/VectorField2D" {
    export default class VectorField2D extends Mobject {
        constructor({ func, xRange, yRange, }?: {
            func?: (x: any, y: any) => any[];
            xRange?: number[];
            yRange?: number[];
        });
        lengthFunc: (length: any) => number;
        colorFunc: () => Color;
        _center: Vector;
        xRange: number[];
        yRange: number[];
        func: (x: any, y: any) => any[];
    }
    import Mobject from "mobjects/Mobject";
    import Color from "math/Color";
    import Vector from "math/Vector";
}
declare module "mobjects/3D/Point3D" {
    export default class Point3D extends Mobject3D {
        /**
         * @param  {Vector | number[] | ...number} position
         */
        constructor(...args: any[]);
        radius: number;
        _v: Vector;
        _a: Vector;
        center: any;
        color: import("mraph").Color;
        set v(val: Vector);
        get v(): Vector;
        set a(val: Vector);
        get a(): Vector;
        set x(val: any);
        get x(): any;
        set y(val: any);
        get y(): any;
        set z(val: any);
        get z(): any;
    }
    import Mobject3D from "mobjects/3D/Mobject3D";
    import Vector from "math/Vector";
}
declare module "extra/OBJLoader" {
    export function parseToGeometry(src: any): Promise<Geometry>;
    export function parseToObject(src: any): Promise<{
        position: any[];
        normal: any[];
        uv: any[];
    }>;
    import Geometry from "geometry/Geometry";
}
declare module "mraph" {
    export * as SlotParser from "material/SlotParser";
    export * as MathFunc from "math/math_func";
    export * as OBJLoader from "extra/OBJLoader";
    export * as COLORS from "constants/colors";
    export * as VECTORS from "constants/vectors";
    export * as GLENUM from "constants/glenum";
    import Color from "math/Color";
    import Matrix from "math/Matrix";
    import Vector from "math/Vector";
    import Quat from "math/Quat";
    import Geometry from "geometry/Geometry";
    import Plane from "geometry/Plane";
    import Box from "geometry/Box";
    import Segment from "geometry/Segment";
    import Sphere from "geometry/Sphere";
    import Cylinder from "geometry/Cylinder";
    import DirectionalLight from "light/DirectionalLight";
    import PointLight from "light/PointLight";
    import Mobject2D from "mobjects/2D/Mobject2D";
    import Point from "mobjects/2D/Point";
    import Tail from "mobjects/2D/Tail";
    import Line from "mobjects/2D/Line";
    import Arc from "mobjects/2D/Arc";
    import Arrow from "mobjects/2D/Arrow";
    import Axis from "mobjects/2D/Axis";
    import Axes from "mobjects/2D/Axes";
    import VectorField2D from "mobjects/2D/VectorField2D";
    import FunctionGraph2D from "mobjects/2D/FunctionGraph2D";
    import FunctionGraph3D from "mobjects/3D/FunctionGraph3D";
    import Point3D from "mobjects/3D/Point3D";
    import Layer from "core/Layer";
    import Camera from "core/Camera";
    import Texture from "core/Texture";
    import WebGLRenderer from "core/WebGL/WebGLRenderer";
    import WebGLProgram from "core/WebGL/WebGLProgram";
    import CustomMaterial from "material/CustomMaterial";
    import BasicMaterial from "material/BasicMaterial";
    import DepthMaterial from "material/DepthMaterial";
    import LambertMaterial from "material/LambertMaterial";
    import Event from "animation/Event";
    import Timeline from "animation/Timeline";
    import OrbitControl from "extra/OrbitControl";
    import Recorder from "extra/Recorder";
    export { Color, Matrix, Vector, Quat, Geometry, Plane, Box, Segment, Sphere, Cylinder, DirectionalLight, PointLight, Mobject2D, Point, Tail, Line, Arc, Arrow, Axis, Axes, VectorField2D, FunctionGraph2D, FunctionGraph3D, Point3D, Layer, Camera, Texture, WebGLRenderer, WebGLProgram, CustomMaterial, BasicMaterial, DepthMaterial, LambertMaterial, Event, Timeline, OrbitControl, Recorder };
}
