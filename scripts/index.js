const main = document.querySelector('main');
const screens = {};
const reminders = [];
//-------------------------------------------
//a função se auto executa assim que o script carrega
(() => start())();
function start() {
  loadData();
}
// disparado quando o usuário clicar no botao 'help' da home screen
function appHelp() {
  alert(
    'É simples, basta entar e clicar no botão "+" para adicionar um novo lembrete'
  );
}
//===========================================================================
// carregam os templates de cada tela
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
  setLimits();
}
//============================================================================
// carrega os dados do localstorage
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
