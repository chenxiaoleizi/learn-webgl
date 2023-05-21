
import {getGl, createShader, createProgram, setAttribute} from "@/core/index.js"

const v = `
  attribute vec4 a_position;
  attribute vec4 a_color;

  varying vec4 v_color;

  void main() {
    gl_Position = a_position;
    v_color = a_color;
  }
`
const f = `
  precision mediump float;

  varying vec4 v_color;

  void main() {
    gl_FragColor = v_color;
  }
`

const gl = getGl()
const vShader = createShader(gl, v, gl.VERTEX_SHADER)
const fShader = createShader(gl, f, gl.FRAGMENT_SHADER)
const program = createProgram(gl, vShader, fShader)
gl.useProgram(program)

// Position and color location
const positionLocation = gl.getAttribLocation(program, "a_position")
const colorLocation = gl.getAttribLocation(program, "a_color")

const verticesColors = new Float32Array([
  0, 0.5, 0, 1, 0, 0,
  -0.5, 0, 0, 0, 1, 0,
  0.5, 0, 0, 0, 0, 1,
])
const BYTES_PER_ELEMENT = verticesColors.BYTES_PER_ELEMENT

function draw() {
  // Set position, size and color
  setAttribute(gl, positionLocation, verticesColors, 3, BYTES_PER_ELEMENT*6, 0)

  setAttribute(gl, colorLocation, verticesColors, 3, BYTES_PER_ELEMENT*6, BYTES_PER_ELEMENT*3)

  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}
draw()