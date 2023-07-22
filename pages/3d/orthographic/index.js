import GUI from 'lil-gui';
import {getGl, createShader, createProgram, setPosition} from "@/core/index.js"
import {Matrix} from "@/math/Matrix.js"

const settings = {
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1
}

const v = `
  attribute vec4 a_position;
  uniform mat4 u_viewMatrix;
  uniform mat4 u_modelMatrix;

  void main() {
    gl_Position = u_viewMatrix * u_modelMatrix * a_position;
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
  // Front
  -0.5, -0.5, 0.5,
  0.5, -0.5, 0.5,
  0.5, 0.5, 0.5,
  -0.5, 0.5, 0.5,
  -0.5, 0.5, 0.5,
  -0.5, -0.5, 0.5,
  // Back
  0.5, -0.5, -0.5,
  -0.5, -0.5, -0.5,
  -0.5, 0.5, -0.5,
  -0.5, 0.5, -0.5,
  0.5, 0.5, -0.5,
  0.5, -0.5, -0.5,
  // Left
  -0.5, -0.5, -0.5,
  -0.5, -0.5, 0.5,
  -0.5, 0.5, 0.5,
  -0.5, 0.5, 0.5,
  -0.5, 0.5, -0.5,
  -0.5, -0.5, -0.5,
  // Right
  0.5, -0.5, 0.5,
  0.5, -0.5, -0.5,
  0.5, 0.5, -0.5,
  0.5, 0.5, -0.5,
  0.5, 0.5, 0.5,
  0.5, -0.5, 0.5,
  // Top
  -0.5, 0.5, 0.5,
  0.5, 0.5, 0.5,
  0.5, 0.5, -0.5,
  0.5, 0.5, -0.5,
  -0.5, 0.5, -0.5,
  -0.5, 0.5, 0.5,
  // Bottom
  0.5, -0.5, 0.5,
  -0.5, -0.5, 0.5,
  -0.5, -0.5, -0.5,
  -0.5, -0.5, -0.5,
  0.5, -0.5, -0.5,
  0.5, -0.5, 0.5,
]
setPosition(gl, positionLocation, new Float32Array(vertices))

// Color
const colorLocation = gl.getUniformLocation(program, "u_color")
gl.uniform4f(colorLocation, 0, 153/255, 1, 1)

// Model matrix
const modelMatrixLocation = gl.getUniformLocation(program, "u_modelMatrix")

// View matrix
const viewMatrix = new Matrix()
viewMatrix.setOrthographic(-10, 10, -10, 10, -10, 10)
const viewMatrixLocation = gl.getUniformLocation(program, "u_viewMatrix")
gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix.elements)

function draw() {
  // Set model matrix
  const modelMatrix = new Matrix()
  const translateMatrix = new Matrix()
  const scaleMatrix = new Matrix()
  const rotateMatrix = new Matrix()

  translateMatrix.setPosition(settings.positionX, settings.positionY, settings.positionZ)
  scaleMatrix.setScale(settings.scaleX, settings.scaleY, settings.scaleZ)
  rotateMatrix.setRotate((settings.rotateZ * Math.PI) / 180)

  modelMatrix.multiply(translateMatrix)
  modelMatrix.multiply(scaleMatrix)
  modelMatrix.multiply(rotateMatrix)

  gl.uniformMatrix4fv(modelMatrixLocation, false, modelMatrix.elements)

  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 6 * 6)
}
draw()

// UI
const gui = new GUI()

const rotate = gui.addFolder("Rotate")
rotate.add(settings, "rotateX").min(0).max(360)
rotate.add(settings, "rotateY").min(0).max(360)
rotate.add(settings, "rotateZ").min(0).max(360)

const position = gui.addFolder("Position")
position.add(settings, "positionX").min(-1).max(1).step(0.01)
position.add(settings, "positionY").min(-1).max(1).step(0.01)
// position.add(settings, "positionZ").min(-1).max(1).step(0.01)

const scale = gui.addFolder("Scale")
scale.add(settings, "scaleX").min(0).max(10)
scale.add(settings, "scaleY").min(0).max(10)
// scale.add(settings, "scaleZ").min(0).max(10)

gui.onChange(() => {
  draw()
})