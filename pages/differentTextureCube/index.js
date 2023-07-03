import GUI from 'lil-gui';
import {getGl, createShader, createProgram, setPosition, setAttribute, loadTexture} from "@/core/index.js"
import {Vec3} from "@/math/Vec.js"
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
  scaleZ: 1,
  cameraPositionX: 1,
  cameraPositionY: 1,
  cameraPositionZ: 1,
}

const v = `
  precision mediump float;
  attribute vec4 a_position;
  uniform mat4 u_modelMatrix;
  uniform mat4 u_viewMatrix;
  uniform mat4 u_projectionMatrix;

  attribute vec2 a_uv;

  varying vec2 v_uv;

  void main() {
    gl_Position = u_projectionMatrix * u_viewMatrix * u_modelMatrix * a_position;
    v_uv = a_uv;
  }
`
const f = `
  precision mediump float;
  uniform sampler2D u_texture;
  varying vec2 v_uv;

  void main() {
    gl_FragColor = texture2D(u_texture, v_uv);
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
  0.5, 0.5, 0.5,
  -0.5, 0.5, 0.5,
  -0.5, -0.5, 0.5,
  // Back
  0.5, -0.5, -0.5,
  0.5, 0.5, -0.5,
  -0.5, -0.5, -0.5,
  0.5, 0.5, -0.5,
  -0.5, 0.5, -0.5,
  -0.5, -0.5, -0.5,
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

// UV
const uvLocation = gl.getAttribLocation(program, "a_uv")
let uvs = [
  // Front
  0.33, 0, 
  0.66, 0,
  0.66, 0.25,
  0.66, 0.25,
  0.33, 0.25,
  0.33, 0,
  // Back
  0.66, 0.75,
  0.33, 0.75,
  0.33, 1,
  0.33, 1,
  0.66, 1,
  0.66, 0.75,
  // Left
  0.33, 0.5,
  0.33, 0.25, 
  0, 0.25, 
  0, 0.25, 
  0, 0.5, 
  0.33, 0.5, 
  // Right
  0.66, 0.25,
  0.66, 0.5,
  1, 0.5,
  1, 0.5,
  1, 0.25,
  0.66, 0.25,
  // Top
  0.66, 0.75,
  0.33, 0.75,
  0.33, 1,
  0.33, 1,
  0.66, 1,
  0.66, 0.75,
  // Bottom
  0.66, 0.25,
  0.33, 0.5,
  0.33, 0.75,
  0.33, 0.75,
  0.66, 0.5,
  0.66, 0.25,
  
]
setAttribute(gl, uvLocation, new Float32Array(uvs), 2
)

// Model matrix
const modelMatrixLocation = gl.getUniformLocation(program, "u_modelMatrix")

// View matrix
const viewMatrixLocation = gl.getUniformLocation(program, "u_viewMatrix")

// Projection matrix
const projectionMatrixLocation = gl.getUniformLocation(program, "u_projectionMatrix")

// Texture
const textureLocation = gl.getUniformLocation(program, "u_texture")

function draw() {
  // Set model matrix
  const modelMatrix = new Matrix()
  const translateMatrix = new Matrix()
  const scaleMatrix = new Matrix()
  const rotateMatrixX = new Matrix()
  const rotateMatrixY = new Matrix()
  const rotateMatrixZ = new Matrix()

  translateMatrix.setPosition(settings.positionX, settings.positionY, settings.positionZ)
  scaleMatrix.setScale(settings.scaleX, settings.scaleY, settings.scaleZ)
  rotateMatrixX.setRotateX((settings.rotateX * Math.PI) / 180)
  rotateMatrixY.setRotateY((settings.rotateY * Math.PI) / 180)
  rotateMatrixZ.setRotateZ((settings.rotateZ * Math.PI) / 180)

  modelMatrix.multiply(translateMatrix)
  modelMatrix.multiply(scaleMatrix)
  modelMatrix.multiply(rotateMatrixZ)
  modelMatrix.multiply(rotateMatrixY)
  modelMatrix.multiply(rotateMatrixX)

  gl.uniformMatrix4fv(modelMatrixLocation, false, modelMatrix.elements)

  // Set view matrix
  const viewMatrix = new Matrix()
  const cameraPosition = new Vec3(settings.cameraPositionX, settings.cameraPositionY, settings.cameraPositionZ)
  viewMatrix.setView(cameraPosition, new Vec3(0, 1, 0), new Vec3(0, 0, 0))
  gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix.elements)

  // Set projection matrix
  const projectionMatrix = new Matrix()
  projectionMatrix.setPerspective(45, 1, 1, 10)
  gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix.elements)

  gl.enable(gl.DEPTH_TEST)
  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 6 * 6)
}

loadTexture(gl, "/images/cube.png").then(() => {
  gl.uniform1i(textureLocation, 0)

  draw()
})
draw()

// UI
const gui = new GUI()

const rotate = gui.addFolder("Rotate")
rotate.add(settings, "rotateX").min(-360).max(360)
rotate.add(settings, "rotateY").min(-360).max(360)
rotate.add(settings, "rotateZ").min(-360).max(360)

const position = gui.addFolder("Position")
position.add(settings, "positionX").min(-1).max(1).step(0.01)
position.add(settings, "positionY").min(-1).max(1).step(0.01)
position.add(settings, "positionZ").min(-1).max(1).step(0.01)

const scale = gui.addFolder("Scale")
scale.add(settings, "scaleX").min(0).max(10)
scale.add(settings, "scaleY").min(0).max(10)
scale.add(settings, "scaleZ").min(0).max(10)

const cameraPosition = gui.addFolder("Camera position")
cameraPosition.add(settings, "cameraPositionX").min(-10).max(10)
cameraPosition.add(settings, "cameraPositionY").min(-10).max(10)
cameraPosition.add(settings, "cameraPositionZ").min(-10).max(10)

gui.onChange(() => {
  draw()
})