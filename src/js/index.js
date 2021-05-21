// "use strict"

//#region // ! Изменение темы
const theme_btn = document.getElementById("checkbox-theme");
const body = document.getElementsByTagName("body");

theme_btn.addEventListener("click", () => {
  for (let item of body) {
    item.className = theme_btn.checked ? "dark-theme" : "light-theme";
  }
});
//#endregion
