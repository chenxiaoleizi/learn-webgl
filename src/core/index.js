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