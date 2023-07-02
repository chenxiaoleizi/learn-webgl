export function getGl(canvasId = "#canvas-elem") {
  const canvasElem = document.querySelector(canvasId)
  canvasElem.width = 500
  canvasElem.height = 500
  
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

// 加载贴图
export function loadTexture(gl, src) {
  const texture = gl.createTexture()
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture)
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
  // gl.texImage2D(
  //   gl.TEXTURE_2D,
  //   level,
  //   internalFormat,
  //   width,
  //   height,
  //   border,
  //   srcFormat,
  //   srcType,
  //   pixel
  // );

  // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Prevents s-coordinate wrapping (repeating).
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  // Prevents t-coordinate wrapping (repeating).
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const image = new Image()
  image.src = src

  return new Promise((resolve) => {
    image.addEventListener("load", function() {
      gl.texImage2D(
        gl.TEXTURE_2D,
        level,
        internalFormat,
        srcFormat,
        srcType,
        image
      );
      resolve()
    })
  })
}