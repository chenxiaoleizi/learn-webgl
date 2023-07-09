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
  lightDirectionX: -0.5,
  lightDirectionY: -0.7,
  lightDirectionZ: -1,
}

const v = `
  precision mediump float;

  attribute vec4 a_position;
  attribute vec3 a_normal;

  uniform mat4 u_modelMatrix;
  uniform mat4 u_viewMatrix;
  uniform mat4 u_projectionMatrix;


  varying vec3 v_normal;

  void main() {
    gl_Position = u_projectionMatrix * u_viewMatrix * u_modelMatrix * a_position;
    v_normal = a_normal;
  }
`
const f = `
  precision mediump float;

  uniform vec3 u_lightDirection;
  varying vec3 v_normal;

  void main() {
    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vec3 cubeColor = vec3(1.0, 1.0, 0.0);
    vec3 color = lightColor * cubeColor * dot(v_normal, normalize(u_lightDirection));
    gl_FragColor = vec4(color, 1.0);
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

// Normal
const normalLocation = gl.getAttribLocation(program, "a_normal")
const normals = [
  // Front
  0, 0, 1, 
  0, 0, 1, 
  0, 0, 1, 
  0, 0, 1, 
  0, 0, 1, 
  0, 0, 1, 
  // Back
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  // Left
  -1, 0, 0, 
  -1, 0, 0, 
  -1, 0, 0, 
  -1, 0, 0, 
  -1, 0, 0, 
  -1, 0, 0, 
  // Right
  1, 0, 0, 
  1, 0, 0, 
  1, 0, 0, 
  1, 0, 0, 
  1, 0, 0, 
  1, 0, 0, 
  // Top
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  // Bottom
  0,-1, 0,
  0,-1, 0,
  0,-1, 0,
  0,-1, 0,
  0,-1, 0,
  0,-1, 0
  
]
setAttribute(gl, normalLocation, new Float32Array(normals), 3)

// Model matrix
const modelMatrixLocation = gl.getUniformLocation(program, "u_modelMatrix")

// View matrix
const viewMatrixLocation = gl.getUniformLocation(program, "u_viewMatrix")

// Projection matrix
const projectionMatrixLocation = gl.getUniformLocation(program, "u_projectionMatrix")

// Light
const lightDirectionLocation = gl.getUniformLocation(program, "u_lightDirection")

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

  // Set light direction
  const lightDirection = new Vec3(settings.lightDirectionX, settings.lightDirectionY, settings.lightDirectionZ)
  lightDirection.invert()
  // lightDirection.normalize()
  gl.uniform3fv(lightDirectionLocation, [lightDirection.x, lightDirection.y, lightDirection.z])

  gl.enable(gl.DEPTH_TEST)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 6 * 6)
}
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

const lightDirection = gui.addFolder("Light position")
lightDirection.add(settings, "lightDirectionX").min(-1).max(1)
lightDirection.add(settings, "lightDirectionY").min(-1).max(1)
lightDirection.add(settings, "lightDirectionZ").min(-1).max(1)

gui.onChange(() => {
  draw()
})