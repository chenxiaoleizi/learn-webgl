
// 获取 WebGL 上下文
export function getContext( canvas ) {

    let contextNames = [ "webgl", "experminal-webgl" ];

    for (let i = 0; i < contextNames.length; i++) {

        let contextName = contextNames[i];

        let gl = canvas.getContext( contextName )
        
        if (gl) {

            return gl

        }

    }
}

// 创建 shader
export function createShader(gl, type, source) {

    let shader = gl.createShader( type );

    gl.shaderSource( shader, source );

    gl.compileShader( shader );

    let success = gl.getShaderParameter( shader, gl.COMPILE_STATUS )

    if (success) {

        return shader

    }

}

// 创建 program
export function createProgram(gl, vertexShader, fragmentShader) {

    let program = gl.createProgram();

    gl.attachShader( program, vertexShader );
    gl.attachShader( program, fragmentShader );

    gl.linkProgram( program );

    let success = gl.getProgramParameter( program, gl.LINK_STATUS )

    if (success) {
        
        return program

    }

}