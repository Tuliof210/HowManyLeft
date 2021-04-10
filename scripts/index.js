const main = document.querySelector('main');
const screens = {};

//-----------------------------------------
(() => start())();
function start() {
  loadHome();
}
//===========================================================================
async function loadHome() {
  if (screens['home']) main['innerHTML'] = screens['home'];
  else main['innerHTML'] = await fetchData('../templates/home.html', 'home');
}
async function loadList() {
  if (screens['list']) main['innerHTML'] = screens['list'];
  else main['innerHTML'] = await fetchData('../templates/list.html', 'list');
}
async function loadEdit() {
  if (screens['edit']) main['innerHTML'] = screens['edit'];
  else main['innerHTML'] = await fetchData('../templates/edit.html', 'edit');
}
//============================================================================
function appHelp() {
  alert('teste');
}
