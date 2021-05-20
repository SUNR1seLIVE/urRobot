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

//#region // ! Раскрытие popup
function renderPopup(id) {
  return (location.href = id);
}
//#endregion

//#region // ! Выделение строки в popup
const items = document.getElementsByClassName("item");
for (let item of items) {
  item.addEventListener("click", () => {
    item.classList.toggle("selected");
  });
}
//#endregion

//#region // ! Изменение темы
const theme_btn = document.getElementById("checkbox-theme");
const body = document.getElementsByTagName("body");

theme_btn.addEventListener("click", () => {
  for (let item of body) {
    item.className = theme_btn.checked ? "dark-theme" : "light-theme";
  }
});
//#endregion

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

//#region // ! Выделение в главной таблици
const inputs = document
  .getElementById("main-table__items")
  .getElementsByClassName("checkbox-input");
const check_all_rows = document.getElementById("main-table-select-all");

let all_selected = false;

const rows = document
  .getElementById("main-table__items")
  .getElementsByTagName("tr");
for (let row of rows) {
  row.addEventListener("click", () => {
    row.children[0].children[0].children[0].checked =
      !row.children[0].children[0].children[0].checked;
    row.children[5].children[0].classList.toggle("edit-block-hidden");
  });
}

check_all_rows.addEventListener("change", () => {
  if (check_all_rows.checked) {
    for (let input of inputs) {
      input.checked = true;
      input.parentElement.parentElement.parentElement.children[5].children[0].className =
        "item__edit-block edit-block-hidden";
    }
  } else {
    for (let input of inputs) {
      input.checked = false;
      input.parentElement.parentElement.parentElement.children[5].children[0].className =
        "item__edit-block";
    }
  }
});

for (let input of inputs) {
  input.addEventListener("change", () => {
    if (input.checked) {
      input.parentElement.parentElement.parentElement.children[5].children[0].className =
        "item__edit-block edit-block-hidden";
    } else {
      input.parentElement.parentElement.parentElement.children[5].children[0].className =
        "item__edit-block";
    }

    if (!input.checked) {
      if (check_all_rows.checked) {
        check_all_rows.checked = false;
      }
    } else {
      for (let input of inputs) {
        if (input.checked) {
          all_selected = true;
        } else {
          all_selected = false;
          return;
        }
      }
      if (!all_selected) {
        check_all_rows.checked = false;
      } else {
        check_all_rows.checked = true;
      }
    }
  });
}
//#endregion

//#region // ! Сортировка в главной таблици
/**
 * Сортировка таблицы HTML.
 *
 * @param {HTMLTableElement} table_header Таблица заголовков
 * @param {HTMLTableElement} table_items Таблица для сортировки
 * @param {number} column Индекс столбца для сортировки
 * @param {boolean} asc Определяет, будет ли сортировка по возрастанию
 */
function sortTableByColumn(table_header, table_items, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table_items.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));
  //Сортируем каждую строку
  const sortedRows = rows.sort((a, b) => {
    const aColText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bColText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
  });
  // Удаляем все существующие строки из таблицы
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }
  // Повторно добавляем отсортированные строки
  tBody.append(...sortedRows);
  // Запомнить, как сейчас сортируется столбец
  table_header
    .querySelectorAll("th")
    .forEach((th) => th.classList.remove("sort-up", "sort-down"));
  table_header
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("sort-up", asc);
  table_header
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("sort-down", !asc);
}

document.querySelectorAll("#main-table__header th").forEach((cell) => {
  const cellIndex = Array.prototype.indexOf.call(
    cell.parentElement.children,
    cell
  );
  if (cellIndex > 0) {
    cell.addEventListener("click", () => {
      const table_header = document.getElementById("main-table__header");
      const table_items = document.getElementById("main-table__items");
      const currentIsAscending = cell.classList.contains("sort-up");
      sortTableByColumn(
        table_header,
        table_items,
        cellIndex,
        !currentIsAscending
      );
    });
  }
});
//#endregion

//#region // ! обработка клика по кнопке скрытия строки таблицы
function hiddenRowTable(btn) {
  btn.parentElement.parentElement.parentElement.style.display = "none";
}
//#endregion

//#region // ! обработка клика по кнопке удаления строки таблицы
function removeRowTable(btn) {
  btn.parentElement.parentElement.parentElement.remove();
}
//#endregion

//#region // ! Включение/выключение строки поиска в таблице
const search = document.getElementsByClassName("search")[0];
const searchBox = document.getElementsByClassName("search-box")[0];
search.addEventListener("click", () => {
  searchBox.classList.toggle("active-search-box");
  search.classList.toggle("search-cancel");
});
//#endregion

//#region // ! Активация кнопок popup6
const tabsBtns = document.getElementsByClassName("popup-edit__btn");
for (let btn of tabsBtns) {
  btn.addEventListener("click", () => {
    const btnIndex = Array.prototype.indexOf.call(
      btn.parentElement.children,
      btn
    );

    for (let b of tabsBtns) {
      b.classList.remove("popup-edit__btn-active");
    }

    for (let i of btn.parentElement.parentElement.children) {
      if (i.classList.contains("tab")) {
        i.classList.remove("tab-active");
      }
    }

    btn.parentElement.parentElement.children[1 + btnIndex].classList.toggle(
      "tab-active"
    );

    btn.classList.toggle("popup-edit__btn-active");
  });
}
//#endregion

//#region //! Включение режима редактирования
const checkEdit = document.getElementById('eс__isactive-edit-btn');console.log(checkEdit);

const tabs_view = [
  document.getElementById('tab-all-info__view'),
  document.getElementById('tab-staff__view'),
  document.getElementById('tab-docs__view')
];
const tabs_edit = [
  document.getElementById('tab-all-info__edit'),
  document.getElementById('tab-staff__edit'),
  document.getElementById('tab-docs__edit')
];

checkEdit.addEventListener('change', ()=>{
  if(checkEdit.checked){
    for(let tab of tabs_edit){
      if(!tab.classList.contains('tab-isactive')){
        tab.classList.add('tab-isactive');
      }
    }
    for(let tab of tabs_view){
      if(tab.classList.contains('tab-isactive')){
        tab.classList.remove('tab-isactive');
      }
    }
  }else{
    for(let tab of tabs_view){
      if(!tab.classList.contains('tab-isactive')){
        tab.classList.add('tab-isactive');
      }
    }
    for(let tab of tabs_edit){
      if(tab.classList.contains('tab-isactive')){
        tab.classList.remove('tab-isactive');
      }
    }
  }
})
//#endregion
