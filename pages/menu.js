export default [
  {
    name: "基础",
    children: [
      {
        name: "绘制单个点",
        src: "./basics/drawPoint/index.html"
      },
      {
        name: "绘制多个点",
        src: "./basics/drawPoints/index.html"
      },
      {
        name: "绘制模式",
        src: "./basics/drawMode/index.html"
      },
      {
        name: "彩色三角形",
        src: "./basics/coloredTriangle/index.html"
      }
    ]
  },
  {
    name: "变换",
    children: [
      {
        name: "移动",
        src: "./transform/translate/index.html"
      },
      {
        name: "缩放",
        src: "./transform/scale/index.html"
      },
      {
        name: "旋转",
        src: "./transform/rotate/index.html"
      },
      {
        name: "变换",
        src: "./transform/transform/index.html"
      }
    ]
  },
  {
    name: "贴图",
    children: [
      {
        name: "绘制贴图",
        src: "./texture/index.html"
      }
    ]
  },
  {
    name: "三维",
    children: [
      {
        name: "模型矩阵",
        src: "./3d/modelMatrix/index.html"
      },
      {
        name: "彩色立方体",
        src: "./3d/coloredCube/index.html"
      },
      {
        name: "视图矩阵",
        src: "./3d/viewMatrix/index.html"
      },
      {
        name: "正交投影",
        src: "./3d/orthographic/index.html"
      },
      {
        name: "透视投影",
        src: "./3d/perspective/index.html"
      },
      {
        name: "不同贴图的立方体",
        src: "./3d/differentTextureCube/index.html"
      },
    ]
  },
  {
    name: "灯光",
    children: [
      {
        name: "平行光",
        src: "./light/directionalLight/index.html"
      },
      {
        name: "点光源",
        src: "./light/pointLight/index.html"
      }
    ]
  },
]