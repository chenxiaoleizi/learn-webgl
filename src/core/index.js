export function getGl(canvasId = "#canvas-elem") {
  const canvasElem = document.querySelector(canvasId)
  canvasElem.width = window.innerWidth
  canvasElem.height = window.innerHeight
  
  const gl = canvasElem.getContext("webgl")

  if (!gl) {
    return undefined
  }

  return gl
}
// 创建 shader
export function createShader(gl, source, type) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
    console.log(gl.getShaderInfoLog( shader ))
    return undefined
  }

  return shader
}

// 创建 program
export function createProgram(gl, vShader, fShader) {
  const program = gl.createProgram()

  gl.attachShader(program, vShader)
  gl.attachShader(program, fShader)

  gl.linkProgram(program)

  if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
    console.log(gl.getProgramInfoLog(program))
    return undefined
  }

  return program
}

// 设置顶点数据
export function setPosition(gl, location, vertices) {
  const buffer = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(location)
}

// 设置 attribute
export function setAttribute(gl, location, srcData, size, stride = 0, offset = 0) {
  const buffer = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, srcData, gl.STATIC_DRAW)

  gl.vertexAttribPointer(location, size, gl.FLOAT, false, stride, offset)
  gl.enableVertexAttribArray(location)
}