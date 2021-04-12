const input = {};

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

function getData() {
  input['title'] = document.querySelector('#input-reminder-title');
  input['date'] = document.querySelector('#input-reminder-date');
  input['hour'] = document.querySelector('#input-reminder-time');

  modelData({
    title: input['title'].value,
    date: input['date'].value,
    hour: input['hour'].value,
  });
}

function valiDate(date, hour) {
  date = date.split('-');
  hour = hour.split(':');

  let dd = date[2];
  let mm = date[1] - 1;
  let yyyy = date[0];
  let hh = hour[0];
  let min = hour[1];

  // console.log({ dd, mm, yyyy, hh, min });
  // console.log({
  //   now: new Date(Date.now()),
  //   input: new Date(yyyy, mm, dd, hh, min, 0),
  //   ok: new Date(Date.now()) < new Date(yyyy, mm, dd, hh, min, 0),
  // });

  return new Date(Date.now()) < new Date(yyyy, mm, dd, hh, min, 0);
}

function modelData({ title, date, hour }) {
  if (valiDate(date, hour)) {
    reminders.push({
      id: Date.now().toString(),
      title: title,
      unstructuredDate: splitDate(date, hour),
    });
    displayList();
  } else alert('the reminder only works for future events, plese try again');
}

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
  console.log({ diffSeconds });

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

  console.log({ diffSeconds, unstructuredDate });

  return unstructuredDate;
}
