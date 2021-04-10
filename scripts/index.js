const main = document.querySelector('main');
//-----------------------------------------
(() => start())();
function start() {
  loadHome();
}
//==========================================
function loadHome() {
  main['innerHTML'] = home_template;
}
function loadList() {
  main['innerHTML'] = list_template;
}
function loadEdit() {
  main['innerHTML'] = edit_template;
}
//==========================================
function appHelp() {
  alert('teste');
}
