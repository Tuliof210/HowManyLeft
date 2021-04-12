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

  console.log({ dd, mm, yyyy, hh, min });
  console.log({
    now: new Date(Date.now()),
    input: new Date(yyyy, mm, dd, hh, min, 0),
    ok: new Date(Date.now()) < new Date(yyyy, mm, dd, hh, min, 0),
  });

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
  compareDates(date, hour);

  date = date.split('-');
  hour = hour.split(':');

  return {
    days: 78,
    hours: hour[0],
    minutes: hour[1],
    seconds: 0,
  };
}

function compareDates(date, hour) {
  date = date.split('-');
  hour = hour.split(':');

  let dd = date[2];
  let mm = date[1] - 1;
  let yyyy = date[0];
  let hh = hour[0];
  let min = hour[1];

  console.log({ date, hour });
  console.log(new Date(Date.now()) - new Date(yyyy, mm, dd, hh, min, 0));
}
