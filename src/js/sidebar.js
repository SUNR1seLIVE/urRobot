// "use strict"

//#region // ! Выделение строки в sidebar
function sidebarBtn(btn) {
  const btns = document.getElementsByClassName("sidebar__item");
  const sideBar = document.getElementById("sidebar");
  if (!sideBar.classList.contains("minSidebar")) {
    for (let i of btns) {
      i.classList.remove("activeSidebar");
      i.classList.remove("activeMinSidebar");
    }
    btn.classList.toggle("activeSidebar");
  } else {
    for (let i of btns) {
      i.classList.remove("activeMinSidebar");
      i.classList.remove("activeSidebar");
    }
    btn.classList.toggle("activeMinSidebar");
  }
}
//#endregion

//#region // ! Выделение иконки в sidebar 360
function sidebarBtn360(btn) {
  const btns360 = document.getElementsByClassName("sidebar__item-360");
  const sideBar360 = document.getElementById("sidebar-360");
  if (sideBar360.classList.contains("activeSidebar")) {
    for (let i of btns360) {
      i.classList.remove("activeSidebar");
    }
    btn.classList.toggle("activeSidebar");
  } else {
    for (let i of btns360) {
      i.classList.remove("activeSidebar");
    }
    btn.classList.toggle("activeSidebar");
  }
}
//#endregion

//#region // !  Изменение размера sidebar
function changeSidebar(btn) {
  document.getElementById("sidebar").classList.toggle("minSidebar");

  const sidebarItems = document.getElementById("sidebar");
  const btns2 = document.getElementsByClassName("sidebar__item");

  if (sidebarItems.classList.contains("minSidebar")) {
    for (let i of btns2) {
      if (i.classList.contains("activeSidebar")) {
        i.classList.remove("activeSidebar");
        i.classList.remove("activeMinSidebar");
      }
    }
  } else {
    for (let i of btns2) {
      if (i.classList.contains("activeMinSidebar")) {
        i.classList.remove("activeMinSidebar");
        i.classList.remove("activeSidebar");
      }
    }
  }

  document.getElementById("content-sidebar").classList.toggle("changeSidebar");
  document.getElementById("content").classList.toggle("content-max");

  const btns = document.getElementsByClassName("sidebar__item-label");
  for (let i of btns) {
    i.classList.toggle("changeBtnSidebar");
  }

  const items = document.getElementsByClassName("sidebar__item");
  for (let i of items) {
    i.classList.toggle("changeItemSidebar");
  }
}
//#endregion
