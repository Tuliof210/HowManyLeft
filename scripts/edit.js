const input = {};

//impede que o date picker exiba datas anteriores à atual
function setLimits() {
  const today = new Date();

  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  document
    .querySelector('#input-reminder-date')
    .setAttribute('min', `${yyyy}-${mm}-${dd}`);
}

//recebe informações do input
function getData() {
  console.time('create reminder');

  input['title'] = document.querySelector('#input-reminder-title');
  input['date'] = document.querySelector('#input-reminder-date');
  input['hour'] = document.querySelector('#input-reminder-time');

  modelNewReminder({
    title: input['title'].value || 'Untitled Event',
    date: input['date'].value,
    hour: input['hour'].value || '00:00',
  });
}

//valida se a data informada é posterior à atual
function valiDate(date, hour) {
  date = date.split('-');
  hour = hour.split(':');

  let dd = date[2];
  let mm = date[1] - 1;
  let yyyy = date[0];
  let hh = hour[0];
  let min = hour[1];

  return new Date(Date.now()) < new Date(yyyy, mm, dd, hh, min, 0);
}

//Carrega os lembretes do localstorage
function modelLoadedReminder({ id, title, date, hour }) {
  if (valiDate(date, hour))
    reminders.push({
      id,
      title,
      date,
      hour,
      unstructuredDate: splitDate(date, hour),
    });
  else
    reminders.push({
      id,
      title,
      date,
      hour,
      unstructuredDate: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    });
}

//modela o novo lembrete
function modelNewReminder({ title, date, hour }) {
  if (valiDate(date, hour)) {
    reminders.push({
      id: Date.now().toString(),
      title,
      date,
      hour,
      unstructuredDate: splitDate(date, hour),
    });
    localStorage.setItem('reminders', JSON.stringify(reminders));
    displayList();
    console.timeEnd('create reminder');
  } else {
    alert('the reminder only works for future events, plese try again');
  }
}

//Calcula quanto tempo falta [minutos, dias, etc]
function splitDate(date, hour) {
  const unstructuredDate = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  //86400 = 24 horas;
  //3600 = 1 hora;
  date = date.split('-');
  hour = hour.split(':');

  let dd = date[2];
  let mm = date[1] - 1;
  let yyyy = date[0];
  let hh = hour[0];
  let min = hour[1];

  let diffSeconds = parseInt(
    Math.abs(new Date(Date.now()) - new Date(yyyy, mm, dd, hh, min, 0)) / 1000
  );

  while (diffSeconds) {
    if (diffSeconds >= 86400) {
      unstructuredDate['days']++;
      diffSeconds -= 86400;
    } else if (diffSeconds >= 3600) {
      unstructuredDate['hours']++;
      diffSeconds -= 3600;
    } else if (diffSeconds >= 60) {
      unstructuredDate['minutes']++;
      diffSeconds -= 60;
    } else {
      unstructuredDate['seconds'] = diffSeconds;
      diffSeconds = 0;
    }
  }

  return unstructuredDate;
}
