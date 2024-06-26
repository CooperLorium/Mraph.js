import Mobject3D from "./Mobject3D.js";
import Point3D from "./Point3D.js";
import Cylinder from "../../geometry/Cylinder.js";
import Matrix from "../../math/Matrix.js";
import Vector from "../../math/Vector.js";
import * as VECTORS from "../../constants/vectors.js";
import * as COLORS from "../../constants/colors.js";

export default class Arrow3D extends Mobject3D {
    tipWidth = 0.06;
    tipLength = 0.12;
    strokeWidth = 0.05;

    constructor(start = new Point3D(-1, 0), end = new Point3D(1, 0)) {
        super();
        this.start = start;
        this.end = Vector.isInstance(end) ? new Point3D(start.center.add(end)) : end;
        this.material.colorMode = "single";
        this.setColor(COLORS.SEIYA_PINK);
    }

    update() {
        const r = this.strokeWidth / 2;
        const cylinder = new Cylinder({
            radii: [r, r, this.tipWidth, 0],
            heights: [this.length - this.tipLength + 0.05, 0, this.tipLength],
            phiSegments: 8,
        });

        cylinder.update();
        this.mergeAttributes(cylinder, "position", "normal");
        this.setIndex(this.getAttributeVal("position").length / 3);

        const vector = this.vector;
        const UP = VECTORS.UP;
        const pivot = vector.cross(UP);
        const angle = Math.acos(vector.project(UP).y / vector.norm);

        const transMatrix = Matrix.rotateOn(pivot, angle, 4).trans(Matrix.translation(...this.start.center));

        this.matrixTransform(transMatrix, 4);
    }

    set vector(vec) {
        this.end = new Point3D(this.start.center.add(vec));
    }

    get vector() {
        return this.end.center.minus(this.start.center);
    }

    set length(val) {
        const vec = this.vector;
        vec.norm = val;
        this.vector = vec;
    }

    get length() {
        return this.vector.norm;
    }
}
