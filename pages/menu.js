export default [
  {
    name: "基础",
    children: [
      {
        name: "绘制单个点",
        src: "./drawPoint/index.html"
      },
      {
        name: "绘制多个点",
        src: "./drawPoints/index.html"
      },
      {
        name: "绘制三角形",
        src: "./drawTriangle/index.html"
      }
    ]
  },
  {
    name: "变换",
    children: [
      {
        name: "变换",
        src: "./transform/index.html"
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
        src: "./modelMatrix/index.html"
      },
      {
        name: "彩色立方体",
        src: "./coloredCube/index.html"
      },
      {
        name: "视图矩阵",
        src: "./viewMatrix/index.html"
      },
      {
        name: "正交投影",
        src: "./orthographic/index.html"
      },
      {
        name: "透视投影",
        src: "./perspective/index.html"
      },
      {
        name: "不同贴图的立方体",
        src: "./differentTextureCube/index.html"
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