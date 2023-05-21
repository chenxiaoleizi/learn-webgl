
import GUI from "lil-gui"
import {getGl, createShader, createProgram, setAttribute} from "@/core/index.js"

const settings = {
  color: {r: 1, g: 0, b: 0}
}

const v = `
  attribute vec4 a_position;
  attribute float a_size;

  void main() {
    gl_Position = a_position;
    gl_PointSize = a_size;
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

// Position and color location
const positionLocation = gl.getAttribLocation(program, "a_position")
const sizeLocation = gl.getAttribLocation(program, "a_size")
const colorLocation = gl.getUniformLocation(program, "u_color")

const verticesSizes = new Float32Array([
  0, 0.5, 0, 10,
  -0.5, 0, 0, 20,
  0.5, 0, 0, 30,
])
const BYTES_PER_ELEMENT = verticesSizes.BYTES_PER_ELEMENT

function draw() {
  // Set position, size and color
  setAttribute(gl, positionLocation, verticesSizes, 3, BYTES_PER_ELEMENT*4, 0)

  setAttribute(gl, sizeLocation, verticesSizes, 1, BYTES_PER_ELEMENT*4, BYTES_PER_ELEMENT*3)

  gl.uniform4f(colorLocation, settings.color.r, settings.color.g, settings.color.b, 1)

  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, 3)
}
draw()

// UI
const gui = new GUI()

gui.addColor(settings, "color")

gui.onChange(() => {
  draw()
})