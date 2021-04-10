const main = document.querySelector('main');
const screens = {};
//-------------------------------------------
const alarms = [];
//-------------------------------------------
(() => start())();
function start() {
  displayHome();
}
//===========================================================================
async function displayHome() {
  if (screens['home']) main['innerHTML'] = screens['home'];
  else main['innerHTML'] = await fetchData('../templates/home.html', 'home');
}
async function displayList() {
  if (screens['list']) main['innerHTML'] = screens['list'];
  else main['innerHTML'] = await fetchData('../templates/list.html', 'list');
}
async function displayEdit() {
  if (screens['edit']) main['innerHTML'] = screens['edit'];
  else main['innerHTML'] = await fetchData('../templates/edit.html', 'edit');
}
//============================================================================
function appHelp() {
  alert('teste');
}
