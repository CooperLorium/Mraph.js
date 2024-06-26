import WebGLProgram from "../core/WebGL/WebGLProgram.js";
import Material from "./Material.js";
import * as SlotParser from "./SlotParser.js";
import GetColorComponent from "./components/GetColorComponent.js";

import vertexShader from "./shader/lambert.vert?raw";
import fragmentShader from "./shader/lambert.frag?raw";

export default class LambertMaterial extends Material {
    constructor() {
        super();
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.attachComponent(new GetColorComponent());
    }

    initProgram(gl, { surroundings }) {
        let { vs, fs } = super.compileComponents();
        fs = SlotParser.replace(fs, "point_light_num", surroundings.pointLights?.length ?? 0);
        fs = SlotParser.replace(fs, "directional_light_num", surroundings.directionalLights?.length ?? 0);
        this.program = new WebGLProgram(gl, { vs, fs });
    }

    passVariables({ surroundings }) {
        const program = this.program;

        const pointLights = surroundings.pointLights;
        if (pointLights && pointLights.length > 0) {
            const pointLightsPosition = [];
            const pointLightsColor = [];
            const pointLightsIntensity = [];
            for (let light of pointLights) {
                pointLightsPosition.push(...light.center);
                pointLightsColor.push(...light.color);
                pointLightsIntensity.push(light.intensity);
            }
            program.setUniform("point_light_position", pointLightsPosition, 3);
            program.setUniform("point_light_color", pointLightsColor, 4);
            program.setUniform("point_light_intensity", pointLightsIntensity, 1);
        }

        const directionalLights = surroundings.directionalLights;
        if (directionalLights && directionalLights.length > 0) {
            const directionalLightsDirection = [];
            const directionalLightsColor = [];
            const directionalLightsIntensity = [];
            for (let light of directionalLights) {
                directionalLightsDirection.push(...light.direction);
                directionalLightsColor.push(...light.color);
                directionalLightsIntensity.push(light.intensity);
            }
            program.setUniform("directional_light_direction", directionalLightsDirection, 3);
            program.setUniform("directional_light_color", directionalLightsColor, 4);
            program.setUniform("directional_light_intensity", directionalLightsIntensity, 1);
        }

        this.passComponentVariables();
    }
}
