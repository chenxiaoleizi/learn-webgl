import { getContext } from "../webglUtil"

const vertexShaderSource = `
    void main() {
        gl_Position = vec4( 0.0, 0.0, 0.0, 1.0 );
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

// 创建 shader
let vertexShader = gl.createShader( gl.VERTEX_SHADER );
gl.shaderSource( vertexShader, vertexShaderSource );
gl.compileShader( vertexShader );

let fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
gl.shaderSource( fragmentShader, fragmentShaderSource );
gl.compileShader( fragmentShader );

// 创建 program
let program = gl.createProgram();
gl.attachShader( program, vertexShader );
gl.attachShader( program, fragmentShader );
gl.linkProgram( program )

// 使用 program
gl.useProgram( program )

gl.clearColor( 0, 0, 0, 1 )
gl.clear( gl.COLOR_BUFFER_BIT )

gl.drawArrays( gl.POINTS, 0, 1 )