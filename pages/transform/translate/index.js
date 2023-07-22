import GUI from 'lil-gui';
import {getGl, createShader, createProgram, setPosition} from "@/core/index.js"
import {Matrix} from "@/math/Matrix.js"

const settings = {
  positionX: 0,
  positionY: 0,
  positionZ: 0
}

const v = `
  attribute vec4 a_position;
  uniform mat4 u_matrix;

  void main() {
    gl_Position = u_matrix * a_position;
    gl_PointSize = 5.0;
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
const vertices = [
  0, 0.5, 0,
  -0.5, -0.5, 0,
  0.5, -0.5, 0
]
setPosition(gl, positionLocation, new Float32Array(vertices))

const colorLocation = gl.getUniformLocation(program, "u_color")
gl.uniform4f(colorLocation, 0, 153/255, 1, 1)

const transformLocation = gl.getUniformLocation(program, "u_matrix")

function draw() {
  // Set transform
  const modelMatrix = new Matrix()
  const translateMatrix = new Matrix()

  translateMatrix.setPosition(settings.positionX, settings.positionY, settings.positionZ)

  modelMatrix.multiply(translateMatrix)

  gl.uniformMatrix4fv(transformLocation, false, modelMatrix.elements)

  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
}
draw()

// UI
const gui = new GUI()

const position = gui.addFolder("Position")
position.add(settings, "positionX").min(-1).max(1).step(0.01)
position.add(settings, "positionY").min(-1).max(1).step(0.01)

gui.onChange(() => {
  draw()
})