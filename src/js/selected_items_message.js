{
  const items = document.getElementsByClassName('item');

  for(let item of items){
    item.addEventListener('click', () =>{
      item.classList.toggle("selected");
    })
  }

  // ! ТОЛЬКО ДЛЯ ТЕСТОВ
  const theme_btn = document.getElementById('theme');
  let body = document.getElementsByTagName('body');

  theme_btn.addEventListener('click', event =>{
    event.preventDefault();
    for(let item of body){
      item.className = (item.className == 'light-theme' ? 'dark-theme': 'light-theme');
    }
  })
}