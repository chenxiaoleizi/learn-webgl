import {Pane} from "tweakpane"
import {getGl, createShader, createProgram} from "@/core/index.js"

const v = `
  void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
  }
`
const f = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`

const gl = getGl()
const vShader = createShader(gl, v, gl.VERTEX_SHADER)
const fShader = createShader(gl, f, gl.FRAGMENT_SHADER)
const program = createProgram(gl, vShader, fShader)

gl.useProgram(program)
gl.clearColor(1, 1, 1, 1)
gl.drawArrays(gl.POINTS, 0, 1)

// UI
const params = {
  color: "#FF0000"
}
const pane = new Pane()
pane.addInput(params, "color")