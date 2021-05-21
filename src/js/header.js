// "use strict"

//#region // ! Dropdown header
function dropdownUser() {
  document.getElementById("dropdown-user").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".header__user-arrow")) {
    let dropdowns = document.getElementsByClassName("dropdown__user-content");

    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
//#endregion
