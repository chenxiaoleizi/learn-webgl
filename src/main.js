import "./style/index.css"

const v = `
  // attribute vec3 a_position;
  void main() {
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
  }
`
const f = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`

const canvasElem = document.querySelector("#canvas-elem")
canvasElem.width = window.innerWidth
canvasElem.height = window.innerHeight
const gl = canvasElem.getContext("webgl")

function createShader(gl, source, type) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
    console.log(gl.getShaderInfoLog( shader ))
  }

  return shader
}

function createProgram(gl, vShader, fShader) {
  const program = gl.createProgram()

  gl.attachShader(program, vShader)
  gl.attachShader(program, fShader)

  gl.linkProgram(program)

  return program
}

const vShader = createShader(gl, v, gl.VERTEX_SHADER)
const fShader = createShader(gl, f, gl.FRAGMENT_SHADER)
const program = createProgram(gl, vShader, fShader)

gl.useProgram(program)
gl.clearColor(1, 1, 1, 1)
gl.drawArrays(gl.POINTS, 0, 1)