import GUI from 'lil-gui';
import {getGl, createShader, createProgram} from "@/core/index.js"

const settings = {
  color: {r: 1, g: 0, b: 0},
  x: 0,
  y: 0
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

function draw() {
  // Set position and color
  gl.vertexAttrib3f(positionLocation, settings.x, settings.y, 0)
  gl.uniform4f(colorLocation, settings.color.r, settings.color.g, settings.color.b, 1)

  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, 1)
}
draw()

// UI
const gui = new GUI()

gui.addColor(settings, "color")

const positionFolder = gui.addFolder("Position")
positionFolder.add(settings, "x").min(-1).max(1)
positionFolder.add(settings, "y").min(-1).max(1)

gui.onChange(() => {
  draw()
})