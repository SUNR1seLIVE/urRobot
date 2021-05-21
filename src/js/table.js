// "use strict"

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
    row.children[0].children[0].children[0].checked = !row.children[0]
      .children[0].children[0].checked;
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
