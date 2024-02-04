import Vector from "../math/Vector.js";
import Color from "../core/Color.js";
import Arc from "./Arc.js";

export default class Point extends Arc {
    fillColor = new Color(1, 1, 1, 1);
    _v = new Vector(0, 0, 0);
    _a = new Vector(0, 0, 0);

    constructor(...args) {
        super(0, 2 * Math.PI, 0.06);

        if (Vector.isVector(args[0])) {
            this.center = args[0];
        } else if (Array.isArray(args[0])) {
            this.center = new Vector(...args[0]);
        } else {
            this.center = new Vector(...args);
        }
        this.center[2] = this.center[2] ?? 0;
    }

    update() {
        this.clear();
        this.move(this.center);
        this.arc(this.radius, 0, Math.PI * 2, false);
        this.fill();
        return this;
    }

    moveTo(pos, { runTime = 1 } = {}) {
        let start;
        this.layer.timeline.addFollow(runTime, {
            start: () => {
                start = this.center;
            },
            update: (p) => {
                this.center = start.lerp(pos, p);
                this.update();
            },
        });
    }

    set v(val) {
        const velo = this._v;
        this._v = val;
        if (velo.norm !== 0) return;

        let lastTime = 0;
        this.layer.timeline.addInfinity({
            update: (_, elapsedTime) => {
                this.center = this.center.add(
                    this._v.mult((elapsedTime - lastTime) / 1000)
                );
                this.update();
                lastTime = elapsedTime;
            },
        });
    }

    get v() {
        return this._v;
    }

    set a(val) {
        const acce = this._a;
        this._a = val;
        if (acce.norm !== 0) return;

        let lastTime = 0;
        this.layer.timeline.addInfinity({
            update: (_, elapsedTime) => {
                this.v = this._v.add(
                    this._a.mult((elapsedTime - lastTime) / 1000)
                );
                lastTime = elapsedTime;
            },
        });
    }

    get a() {
        return this._a;
    }

    set x(val) {
        this.center[0] = val;
    }

    get x() {
        return this.center[0];
    }

    set y(val) {
        this.center[1] = val;
    }

    get y() {
        return this.center[1];
    }

    set z(val) {
        this.center[2] = val;
    }

    get z() {
        return this.center[2];
    }
}