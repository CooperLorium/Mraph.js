export default class ProgramManager {
    constructor() {
        this.programPool = {};
    }

    setProgram(material, gl, scene) {
        const key = this.getProgramKey(material);
        const program = this.programPool[key];

        if (program) material.program = program;
        else {
            material.initProgram(gl, scene);
            this.programPool[key] = material.program;
        }
    }

    getProgramKey(material) {
        return material.constructor.name + material.colorMode;
    }
}
