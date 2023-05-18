import {Pane} from "tweakpane"
import {getGl, createShader, createProgram, setPosition} from "@/core/index.js"

const params = {
  pointCount: 10,
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

// Position
const positionLocation = gl.getAttribLocation(program, "a_position")

const colorLocation = gl.getUniformLocation(program, "u_color")
gl.uniform4f(colorLocation, params.color.r, params.color.g, params.color.b, 1)

function createRandomPoints() {
  const vertices = []

  for (let i = 0; i < params.pointCount; i++) {
    const x = Math.random() * 2 - 1
    const y = Math.random() * 2 - 1
    
    vertices.push(x, y, 0)
  }
  setPosition(gl, positionLocation, new Float32Array(vertices))
}

function draw() {
  gl.clearColor(1, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, params.pointCount)
}
draw()

// UI
const pane = new Pane()
pane.addInput(params, "pointCount", {
  picker: 'inline',
  expanded: true
})
.on("change", () => {
  draw()
})

pane.addInput(params, "color", {color: {type: 'float'}})
.on("change", () => {
  gl.uniform4f(colorLocation, params.color.r, params.color.g, params.color.b, 1)
  draw()
})

pane.addButton({title: "Create points", label: "Create"})
.on("click", () => {
  createRandomPoints()
  draw()
})