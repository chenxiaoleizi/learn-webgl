import { getContext, createShader, createProgram } from "../webglUtil"

const vertexShaderSource = `
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = 10.0;
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

// 向 attribute 变量赋值
gl.vertexAttrib3f( a_Position, 0, 0, 0 )

gl.clearColor( 0, 0, 0, 1 );
gl.clear( gl.COLOR_BUFFER_BIT );

gl.drawArrays( gl.POINT, 0, 1 )