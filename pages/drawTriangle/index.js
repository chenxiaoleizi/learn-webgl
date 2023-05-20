import GUI from 'lil-gui';
import {getGl, createShader, createProgram, setPosition} from "@/core/index.js"

const settings = {
  mode: "POINTS"
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
const vertices = []
setPosition(gl, positionLocation, new Float32Array(vertices))

const colorLocation = gl.getUniformLocation(program, "u_color")
gl.uniform4f(colorLocation, 1, 0, 0, 1)

function draw() {
  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(settings.mode, 0, 6)
}
draw()

// UI
const gui = new GUI()
gui.add(settings, "mode", [
  "POINTS",
  "LINES",
  "LINE_STRIP",
  "LINE_LOOP",
  "TRIANGLES",
  "TRIANGLE_STRIP",
  "TRIANGLE_FAN"
])