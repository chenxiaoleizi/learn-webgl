const container = document.querySelector(".menu")
const iframe = document.querySelector("iframe")

function toggleSubMenu(event) {

  const menuItemSub = event.target.nextSibling
  menuItemSub.classList.toggle("is-open")

}
function createMenu(container, menuData) {

  for (const value of menuData) {
    // 菜单
    const menuItem = document.createElement("div")
    menuItem.className = "menu-item"
    container.appendChild(menuItem)

    // 菜单名称
    const menuName = document.createElement("div")
    menuName.className = "menu-name"
    menuName.innerText = value.name
    menuName.addEventListener("click", toggleSubMenu)
    menuItem.appendChild(menuName)

    const menuDataSub = value.children
    if (!menuDataSub) continue

    // 子菜单
    const menuItemSub = document.createElement("div")
    menuItemSub.className = "menu-item-sub"
    menuItem.appendChild(menuItemSub)

    // 子菜单包裹
    const menuItemSubInner = document.createElement("div")
    menuItemSubInner.className = "menu-item-sub-inner"
    menuItemSub.appendChild(menuItemSubInner)

    for (let valueSub of menuDataSub) {
      const menuName = document.createElement("div")
      menuName.className = "menu-name"
      menuName.innerText = valueSub.name

      menuItemSubInner.appendChild(menuName)
    }
  }

}

const menuData = [
  {
    name: "基础",
    children: [
      {
        name: "点",
        src: "./coloredTriangle/index.html"
      },
      {
        name: "线"
      }
    ]
  },
  {
    name: "变化",
    children: [
      {
        name: "缩放"
      },
      {
        name: "旋转"
      }
    ]
  }
]

createMenu(container, menuData)