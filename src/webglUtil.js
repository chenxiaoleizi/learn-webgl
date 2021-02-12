
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