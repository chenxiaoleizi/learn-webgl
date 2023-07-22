import GUI from "lil-gui"
import {getGl, createShader, createProgram, setPosition} from "@/core/index.js"

const settings = {
  count: 10,
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

// Position and color location
const positionLocation = gl.getAttribLocation(program, "a_position")
const colorLocation = gl.getUniformLocation(program, "u_color")

function createRandomPoints() {
  const vertices = []

  for (let i = 0; i < settings.count; i++) {
    const x = Math.random() * 2 - 1
    const y = Math.random() * 2 - 1
    
    vertices.push(x, y, 0)
  }
  setPosition(gl, positionLocation, new Float32Array(vertices))
}

function draw() {
  // Set position and color
  createRandomPoints()
  gl.uniform4f(colorLocation, settings.color.r, settings.color.g, settings.color.b, 1)

  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, settings.count)
}
// draw()

// UI
const gui = new GUI()

gui.add(settings, "count").min(1).max(100)
gui.addColor(settings, "color")

gui.onChange(() => {
  draw()
})