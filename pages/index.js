import menuData from "./menu.js"

const container = document.querySelector(".menu")
const iframe = document.querySelector("iframe")

function toggleSubMenu(event) {

  const menuItemSub = event.target.nextSibling
  menuItemSub.classList.toggle("is-open")

}

function setIframeSrc(event) {
  const target = event.target

  const iframeSrc = target.getAttribute("iframe-src")
  iframe.setAttribute("src", iframeSrc)

  const menuNames = document.querySelectorAll(".menu-item-sub .menu-name")
  for (const menuName of menuNames) {
    menuName.classList.remove("menu-selected")
  }
  target.classList.add("menu-selected")
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

      const {name, src} = valueSub
      menuName.innerText = name
      menuName.setAttribute("iframe-src", src)
      menuName.addEventListener("click", setIframeSrc)

      menuItemSubInner.appendChild(menuName)
    }
  }

}

// Create menu
createMenu(container, menuData)