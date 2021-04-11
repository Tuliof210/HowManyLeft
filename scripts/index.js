const main = document.querySelector('main');
const screens = {};
//-------------------------------------------
const reminders = [
  {
    id: '46543434',
    title: 'Entregar essa bosta',
    unstructuredDate: {
      days: 1,
      hours: 9,
      minutes: 45,
      seconds: 45,
    },
  },
  {
    id: '139539',
    title: 'Aniversario Muzin',
    unstructuredDate: {
      days: 45,
      hours: 3,
      minutes: 11,
      seconds: 28,
    },
  },
];
//-------------------------------------------
(() => start())();
function start() {
  displayHome();
}
function appHelp() {
  alert('teste');
}
//===========================================================================
async function displayHome() {
  if (screens['home']) main['innerHTML'] = screens['home'];
  else main['innerHTML'] = await fetchData('../templates/home.html', 'home');
}
async function displayList() {
  if (screens['list']) main['innerHTML'] = screens['list'];
  else main['innerHTML'] = await fetchData('../templates/list.html', 'list');

  populateReminders();
}
async function displayEdit() {
  if (screens['edit']) main['innerHTML'] = screens['edit'];
  else main['innerHTML'] = await fetchData('../templates/edit.html', 'edit');
}
//============================================================================

function populateReminders() {
  let remindersHTML = ``;
  reminders.forEach(reminder => {});
  const listWrapper = document.querySelector('.list-main');
}
