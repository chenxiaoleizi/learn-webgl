import { getContext, createShader, createProgram } from "../webglUtil"

const vertexShaderSource = `
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = 5.0;
    }
`

const fragmentShaderSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
    }
`

let canvas = document.querySelector("#canvas");

let gl = getContext( canvas )

let vertexShader = createShader( gl, gl.VERTEX_SHADER, vertexShaderSource );
let fragmentShader = createShader( gl, gl.FRAGMENT_SHADER, fragmentShaderSource );

let program = createProgram( gl, vertexShader, fragmentShader );
gl.useProgram( program );

// 获取 attribute 变量的存储位置
let a_Position = gl.getAttribLocation( program, "a_Position" );

// 创建顶点数据
let vertices = new Float32Array([
    0.0, 0.3,
    -0.2, -0.1,
    0.2, -0.1
])

// 创建 buffer 对象
let verticesBuffer = gl.createBuffer();

// 绑定缓冲区对象
gl.bindBuffer( gl.ARRAY_BUFFER, verticesBuffer );

// 江湖数据写入缓冲区
gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

// 将缓冲区对象分配给 attribute 变量
gl.vertexAttribPointer( a_Position, 2, gl.FLOAT, false, 0, 0 )

// 开启 attribute 变量
gl.enableVertexAttribArray( a_Position )

gl.clearColor( 0, 0, 0, 1 );
gl.clear( gl.COLOR_BUFFER_BIT );

gl.drawArrays( gl.POINT, 0, 3 )