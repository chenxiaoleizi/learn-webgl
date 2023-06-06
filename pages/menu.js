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
        name: "视图矩阵",
        src: "./viewMatrix/index.html"
      },
      {
        name: "正交投影",
        src: "./orthographic/index.html"
      }
    ]
  }
]