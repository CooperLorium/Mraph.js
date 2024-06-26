import * as COLORS from "../constants/colors.js";

export default class Material {
    /**
     * Whether to use depth test, true by default.
     * @type {boolean}
     */
    depthTest = true;

    /**
     * Whether to use depth mask, true by default.
     * @type {boolean}
     */
    depthMask = true;

    /**
     * Determines the mode of color, avaible options are 'single', 'texture' and 'vertex'.
     * @type {string}
     */
    colorMode = "single";

    /**
     * Used when color mode is 'single'.
     * @type {Color}
     */
    color = COLORS.WHITE;

    /**
     * Used when color mode is 'texture'.
     */
    diffuseTexture = null;

    /**
     * The code of vertex shader.
     * @type {string}
     */
    vertexShader = "";

    /**
     * The code of fragment shader.
     * @type {string}
     */
    fragmentShader = "";

    /**
     * Components that attatched to this material.
     * @type {Component}
     */
    components = [];

    /**
     * Custom method to pass all variables, will be called before rendering.
     */
    passVariables() {}

    /**
     * Attachs a component to this material.
     * @param {Component} component
     */
    attachComponent(component) {
        this.components.push(component);
    }

    /**
     * Compiles Shader code depends on all components attached.
     * @returns {string}
     */
    compileComponents() {
        let code;
        for (let component of this.components) {
            code = component.compile(this.vertexShader, this.fragmentShader, this);
        }
        return code;
    }

    /**
     * Passes all components variables.
     */
    passComponentVariables() {
        for (let component of this.components) component.passVariables(this);
    }
}
