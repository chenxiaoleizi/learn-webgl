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

  cubeColor: [ 1, 1, 1 ],

  ambientLightColor: [ 1, 0, 0 ],
  ambientLightIntensity: 0.23,

  directionalLightColor: [ 0, 1, 0 ],
  directionalLightIntensity: 1,
  directionalLightDirectionX: -0.3,
  directionalLightDirectionY: -0.6,
  directionalLightDirectionZ: -0.5,

  pointLightColor: [ 0, 0, 1 ],
  pointLightIntensity: 1,
  pointLightPositionX: 2,
  pointLightPositionY: 2,
  pointLightPositionZ: 2,
}

const v = `
  precision mediump float;

  attribute vec4 a_position;
  attribute vec3 a_normal;

  uniform mat4 u_modelMatrix;
  uniform mat4 u_viewMatrix;
  uniform mat4 u_projectionMatrix;

  varying vec3 v_normal;
  varying vec4 v_position;

  void main() {
    gl_Position = u_projectionMatrix * u_viewMatrix * u_modelMatrix * a_position;
    v_normal = a_normal;
    v_position = u_modelMatrix * a_position;
  }
`
const f = `
  precision mediump float;

  uniform vec3 u_cubeColor;

  uniform vec3 u_ambientLightColor;
  uniform float u_ambientLightIntensity;

  uniform vec3 u_directionalLightColor;
  uniform float u_directionalLightIntensity;
  uniform vec3 u_directionalLightDirection;

  uniform vec3 u_pointLightColor;
  uniform vec3 u_pointLightPosition;
  uniform float u_pointLightIntensity;

  varying vec4 v_position;
  varying vec3 v_normal;

  void main() {
    vec3 ambientLightColor = u_ambientLightColor * u_cubeColor * vec3(u_ambientLightIntensity);

    vec3 directionalColor = u_directionalLightColor * u_cubeColor * dot(v_normal, normalize(u_directionalLightDirection));
    directionalColor = directionalColor * vec3(u_directionalLightIntensity);

    vec3 pointLightDirection = normalize(u_pointLightPosition - vec3(v_position));
    vec3 pointColor = u_pointLightColor * u_cubeColor * dot(v_normal, pointLightDirection);
    pointColor = pointColor * vec3(u_pointLightIntensity);

    vec3 color = ambientLightColor + directionalColor + pointColor;

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

// Model View Projection matrix
const modelMatrixLocation = gl.getUniformLocation(program, "u_modelMatrix")
const viewMatrixLocation = gl.getUniformLocation(program, "u_viewMatrix")
const projectionMatrixLocation = gl.getUniformLocation(program, "u_projectionMatrix")

// Cube color
const cubeColorLocation = gl.getUniformLocation(program, "u_cubeColor")

// Light color
const ambientLightColorLocation = gl.getUniformLocation(program, "u_ambientLightColor")
const ambientLightIntensityLocation = gl.getUniformLocation(program, "u_ambientLightIntensity")

const directionalLightColorLocation = gl.getUniformLocation(program, "u_directionalLightColor")
const directionalLightIntensityLocation = gl.getUniformLocation(program, "u_directionalLightIntensity")
const directionalLightDirectionLocation = gl.getUniformLocation(program, "u_directionalLightDirection")

const pointLightColorLocation = gl.getUniformLocation(program, "u_pointLightColor")
const pointLightIntensityLocation = gl.getUniformLocation(program, "u_pointLightIntensity")
const pointLightPositionLocation = gl.getUniformLocation(program, "u_pointLightPosition")

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

  // Set light and cube color
  gl.uniform3fv(cubeColorLocation, settings.cubeColor)

  gl.uniform3fv(ambientLightColorLocation, settings.ambientLightColor)
  gl.uniform1f(ambientLightIntensityLocation, settings.ambientLightIntensity)

  gl.uniform3fv(directionalLightColorLocation, settings.directionalLightColor)
  gl.uniform1f(directionalLightIntensityLocation, settings.directionalLightIntensity)
  gl.uniform3fv(directionalLightDirectionLocation, [-settings.directionalLightDirectionX, -settings.directionalLightDirectionY, -settings.directionalLightDirectionZ])

  gl.uniform3fv(pointLightColorLocation, settings.pointLightColor)
  gl.uniform1f(pointLightIntensityLocation, settings.pointLightIntensity)
  gl.uniform3fv(pointLightPositionLocation, [settings.pointLightPositionX, settings.pointLightPositionY, settings.pointLightPositionZ])

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

const ambientFolder = gui.addFolder("Ambient light")
ambientFolder.addColor(settings, "ambientLightColor")
ambientFolder.add(settings, "ambientLightIntensity").min(0).max(1)

const directionalFolder = gui.addFolder("Directional light")
directionalFolder.addColor(settings, "directionalLightColor")
directionalFolder.add(settings, "directionalLightIntensity").min(0).max(1)
directionalFolder.add(settings, "directionalLightDirectionX").min(-1).max(1)
directionalFolder.add(settings, "directionalLightDirectionY").min(-1).max(1)
directionalFolder.add(settings, "directionalLightDirectionZ").min(-1).max(1)

const pointFolder = gui.addFolder("Point light")
pointFolder.addColor(settings, "pointLightColor")
pointFolder.add(settings, "pointLightIntensity").min(0).max(1)
pointFolder.add(settings, "pointLightPositionX").min(-2).max(2)
pointFolder.add(settings, "pointLightPositionY").min(-2).max(2)
pointFolder.add(settings, "pointLightPositionZ").min(-2).max(2)

gui.onChange(() => {
  draw()
})