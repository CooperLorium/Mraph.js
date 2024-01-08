import * as DrawModes from "../../constants/draw_modes.js";

export default class WebGLRenderer {
    constructor(canvas) {
        this.canvas = canvas;

        this.gl = canvas.getContext("webgl2");
        if (!this.gl) this.gl = canvas.getContext("webgl");

        const gl = this.gl;
        this.usage = gl.STATIC_DRAW;
        gl.enable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    render(mesh, camera, material) {
        const gl = this.gl;

        if (material.transparent) gl.disable(gl.DEPTH_TEST);

        if (!material.program) material.initProgram(this.gl);
        const program = material.program;

        program.setUniform("viewMat", camera.viewMat);
        program.setUniform("projectionMat", camera.projectionMat);

        for (let [name, value] of Object.entries(mesh.attributes ?? {})) {
            const n = value.n ?? program.attributes[name];
            program.setAttriBuffer(name, value, n, this.usage);
        }

        for (let [name, data] of Object.entries(mesh.uniforms ?? {})) {
            program.setUniform(name, data);
        }

        const indices = mesh.indices;

        let mode;
        if (mesh.glMode) mode = mesh.glMode;
        else if (mesh.mode) {
            mode = DrawModes.toWebGLMode(gl, mesh.mode);
            mesh.glMode = mode;
        } else mode = gl.TRIANGLES;

        if (typeof indices !== "number") {
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
            gl.bufferData(
                gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(indices.data),
                this.usage
            );

            const type = indices.webglType ?? gl.UNSIGNED_SHORT;

            gl.drawElements(mode, indices.data.length, type, 0);
        } else {
            gl.drawArrays(mode, 0, indices);
        }

        for (let child of mesh.children ?? []) {
            this.render(child, camera, material);
        }

        if (material.transparent) gl.enable(gl.DEPTH_TEST);
    }

    clear(r, g, b, a) {
        const gl = this.gl;
        gl.clearColor(r, g, b, a);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
}