const main = document.querySelector('main');
const screens = {};
const reminders = [];
//-------------------------------------------
(() => start())();
function start() {
  loadData();
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
  console.log({ reminders });
  populateReminders();
}
async function displayEdit() {
  if (screens['edit']) main['innerHTML'] = screens['edit'];
  else main['innerHTML'] = await fetchData('../templates/edit.html', 'edit');
  setLimits();
}
//============================================================================

function loadData() {
  console.time('load reminders');
  try {
    const aux = JSON.parse(localStorage.getItem('reminders'));
    aux.forEach(element => {
      modelLoadedReminder({
        id: element.id,
        title: element.title,
        date: element.date,
        hour: element.hour,
      });
      localStorage.setItem('reminders', JSON.stringify(reminders));
      console.timeEnd('load reminders');
    });
  } catch (err) {
    console.error('error to load previous reminders', err);
  } finally {
    displayHome();
  }
}
