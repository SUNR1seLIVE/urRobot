{
  const items = document.getElementsByClassName('item');

  for (let item of items) {
    item.addEventListener('click', () => {
      item.classList.toggle("selected");
    })
  }

  
  //#region // ! Выделение в главной таблици
  const inputs = document.getElementById('main-table__items').getElementsByClassName('checkbox-input');
  const check_all_rows = document.getElementById('main-table-select-all');

  let all_selected = false;

  check_all_rows.addEventListener('change', () => {
    if (check_all_rows.checked) {
      for (let input of inputs) {
        input.checked = true;
      }
    }else{
      for (let input of inputs) {
        input.checked = false;
      }
    }
  })

  for (let input of inputs) {
    input.addEventListener('change', () => {

      if (!input.checked){
        if(check_all_rows.checked){
          check_all_rows.checked = false;
        }
      }else{
        for (let input of inputs) {
          if (input.checked){
            all_selected = true;
          } else {
            all_selected = false;
            return;
          }
        }
        if(!all_selected){
          check_all_rows.checked = false;
        }else{
          check_all_rows.checked = true;
        }
      }
    })
  }
  //#endregion

  //#region // ! ТОЛЬКО ДЛЯ ТЕСТОВ
  const theme_btn = document.getElementById('theme');
  let body = document.getElementsByTagName('body');

  theme_btn.addEventListener('click', event => {
    event.preventDefault();
    for (let item of body) {
      item.className = (item.className == 'light-theme' ? 'dark-theme' : 'light-theme');
    }
  })
}
//#endregion

