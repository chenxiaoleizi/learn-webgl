function createMenu(container, menuData) {

  for (const value of menuData) {
    const menuItem = document.createElement("div")
    menuItem.className = "menu-item"
    const menuName = document.createElement("div")
    menuName.className = "menu-name"
    menuName.innerText = value.name
    menuItem.appendChild(menuName)

    container.appendChild(menuItem)

    const menuDataSub = value.children
    if (!menuDataSub) continue

    const menuItemSub = document.createElement("div")
    menuItem.className = "menu-item-sub"
    menuItem.appendChild(menuItemSub)

    for (let valueSub of menuDataSub) {
      const menuName = document.createElement("div")
      menuName.className = "menu-name"
      menuName.innerText = valueSub.name

      menuItemSub.appendChild(menuName)
    }
  }

}

const menuData = [
  {
    name: "基础",
    children: [
      {
        name: "点"
      },
      {
        name: "线"
      }
    ]
  }
]
const container = document.querySelector(".menu")
createMenu(container, menuData)