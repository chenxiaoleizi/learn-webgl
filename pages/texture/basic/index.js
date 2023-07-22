
import {getGl, createShader, createProgram, setAttribute, loadTexture} from "@/core/index.js"

const v = `
  attribute vec4 a_position;
  attribute vec2 a_uv;

  varying vec2 v_uv;

  void main() {
    gl_Position = a_position;
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

// Position and color location
const positionLocation = gl.getAttribLocation(program, "a_position")
const uvLocation = gl.getAttribLocation(program, "a_uv")
const textureLocation = gl.getUniformLocation(program, "u_texture")

const verticesUvs = new Float32Array([
  -0.5, -0.5, 0, 0, 0,
  0.5, -0.5, 0, 1, 0,
  0.5, 0.5, 0, 1, 1,
  0.5, 0.5, 0, 1, 1,
  -0.5, 0.5, 0, 0, 1,
  -0.5, -0.5, 0, 0, 0
])
const BYTES_PER_ELEMENT = verticesUvs.BYTES_PER_ELEMENT

loadTexture(gl, "/images/cat.jpg").then(() => {
  gl.uniform1i(textureLocation, 0)

  draw()
})
function draw() {
  // Set position, size and color
  setAttribute(gl, positionLocation, verticesUvs, 3, BYTES_PER_ELEMENT*5, 0)

  setAttribute(gl, uvLocation, verticesUvs, 2, BYTES_PER_ELEMENT*5, BYTES_PER_ELEMENT*3)

  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
}

draw()
