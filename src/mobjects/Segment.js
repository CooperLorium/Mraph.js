import Graph from "./Graph.js";
import Matrix from "../math/Matrix.js";
import Color from "../core/Color.js";
import Point from "./Point.js";

export default class Segment extends Graph {
    strokeWidth = 0.05;
    strokeColor = new Color(1, 1, 1, 1);
    indices = { data: [0, 1, 3, 2, 0, 3] };
    tips = [];

    constructor(start, end) {
        super();
        this.start = start;
        this.end = end;
    }

    update() {
        const start = this.start.center;
        const end = this.end.center;
        const vec = end.reduce(start).trans(Matrix.rotateZ(Math.PI / 2, 3));
        vec.norm = this.strokeWidth / 2;

        const vertices = [
            start.add(vec),
            start.reduce(vec),
            end.add(vec),
            end.reduce(vec),
        ].flat(2);

        this.attributes.position.data = vertices;

        const color = [];
        for (let i = 0; i <= vertices.length / 3; i++) {
            color.push(...this.strokeColor);
        }
        this.attributes.color.data = color;
    }

    renderByCanvas2d(renderer) {
        if (!renderer || !this.visible) return this;

        renderer.style(this);
        renderer.begin();
        renderer.move(this.start.center);
        renderer.line3D(this.end.center);
        renderer.stroke();

        if (!this.tips.length) return this;

        // render tips
        const start = this.start.center;

        for (let [at, reverse] of this.tips) {
            const vec = start
                .add(this.vector.mult(at))
                .add(this.vector.normal().mult(0.05));

            renderer.begin();
            renderer.move(vec);

            const h = this.vector;
            h.norm = this.strokeWidth * 3;

            const w = h.mult(1 / 2);

            if (reverse) {
                renderer.line3D(
                    vec.add(h).add(w.trans(Matrix.rotateZ(Math.PI / 2, 3)))
                );
                renderer.line3D(
                    vec.add(h).add(w.trans(Matrix.rotateZ(-Math.PI / 2, 3)))
                );
            } else {
                renderer.line3D(
                    vec.reduce(h).add(w.trans(Matrix.rotateZ(Math.PI / 2, 3)))
                );
                renderer.line3D(
                    vec.reduce(h).add(w.trans(Matrix.rotateZ(-Math.PI / 2, 3)))
                );
            }

            renderer.close();
            renderer.fill();
        }

        return this;
    }

    addTip(at, reverse = false) {
        this.tips.push([at, reverse]);
    }

    set vector(vec) {
        this.end = new Point(this.start.center.add(vec));
    }

    get vector() {
        return this.end.center.reduce(this.start.center);
    }

    set length(val) {
        const vec = this.vector;
        vec.norm = val;
        this.vector = vec;
    }

    get length() {
        return this.vector.norm;
    }

    get slope() {
        const s = this.start.center;
        const e = this.end.center;

        return (s[1] - s[0]) / (e[1] - e[0]);
    }
}
