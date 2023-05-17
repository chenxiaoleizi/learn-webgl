import {Pane} from "tweakpane"
import {getGl, createShader, createProgram} from "@/core/index.js"

const params = {
  position: {x: 0, y: 0},
  color: {r: 1, g: 0, b: 0}
}

const v = `
  attribute vec4 a_position;

  void main() {
    gl_Position = a_position;
    gl_PointSize = 10.0;
  }
`
const f = `
  precision mediump float;

  uniform vec4 u_color;

  void main() {
    gl_FragColor = u_color;
  }
`

const gl = getGl()
const vShader = createShader(gl, v, gl.VERTEX_SHADER)
const fShader = createShader(gl, f, gl.FRAGMENT_SHADER)
const program = createProgram(gl, vShader, fShader)
gl.useProgram(program)

// Position
const positionLocation = gl.getAttribLocation(program, "a_position")
gl.vertexAttrib3f(positionLocation, params.position.x, params.position.y, 0)

const colorLocation = gl.getUniformLocation(program, "u_color")
gl.uniform4f(colorLocation, params.color.r, params.color.g, params.color.b, 1)

gl.clearColor(1, 1, 1, 1)
gl.drawArrays(gl.POINTS, 0, 1)

// UI
const pane = new Pane()
pane.addInput(params, "position", {
  picker: 'inline',
  expanded: true,
  x: {mix: -1, max: 1},
  y: {mix: -1, max: 1}
})
.on("change", () => {
  gl.vertexAttrib3f(positionLocation, params.position.x, params.position.y, 0)
  gl.clearColor(1, 1, 1, 1)
  gl.drawArrays(gl.POINTS, 0, 1)
})

pane.addInput(params, "color", {color: {type: 'float'}})
.on("change", () => {
  gl.uniform4f(colorLocation, params.color.r, params.color.g, params.color.b, 1)
  gl.clearColor(1, 1, 1, 1)
  gl.drawArrays(gl.POINTS, 0, 1)
})