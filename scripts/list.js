const reminders = [
  {
    id: '46543434',
    title: 'Entregar essa bosta',
    unstructuredDate: {
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 15,
    },
  },
  {
    id: '139539',
    title: 'Aniversario Lele',
    unstructuredDate: {
      days: 45,
      hours: 3,
      minutes: 11,
      seconds: 8,
    },
  },
];
//-------------------------------------------
//-------------------------------------------
function populateReminders() {
  let remindersHTML = ``;
  reminders.forEach(reminder => {
    reminder['counter'] = setCounter(reminder);
    remindersHTML += `
      <div id="reminder-row-${reminder.id}" class="reminder-row">
        <div class="reminder-wrapper">
          <h1 class="reminder-title">${reminder.title}</h1>
          <div class="reminder-date">
            <div class="days">
              <div class="reminder-value">${turnIntoString(
                reminder['unstructuredDate'].days,
                3,
                '0'
              )}</div>
              <div class="reminder-label">days</div>
            </div>
            <div class="separator">:</div>
            <div class="hours">
              <div class="reminder-value">${turnIntoString(
                reminder['unstructuredDate'].hours,
                2,
                '0'
              )}</div>
              <div class="reminder-label">hours</div>
            </div>
            <div class="separator">:</div>
            <div class="minutes">
              <div class="reminder-value">${turnIntoString(
                reminder['unstructuredDate'].minutes,
                2,
                '0'
              )}</div>
              <div class="reminder-label">minutes</div>
            </div>
            <div class="separator">:</div>
            <div class="seconds">
              <div class="reminder-value">${turnIntoString(
                reminder['unstructuredDate'].seconds,
                2,
                '0'
              )}</div>
              <div class="reminder-label">seconds</div>
            </div>
          </div>
        </div>
        <div onclick="removeReminver(${reminder.id})" class="reminder-destroy">
          <img src="../assets/icons/trash.svg" alt="Delete" />
        </div>
      </div>
    `;
  });
  document.querySelector('.list-main').innerHTML = remindersHTML;
}

function setCounter(data) {
  return setInterval(() => {
    if (data['unstructuredDate'].seconds) {
      data['unstructuredDate'].seconds -= 1;
    } else if (data['unstructuredDate'].minutes) {
      data['unstructuredDate'].seconds = 59;
      data['unstructuredDate'].minutes -= 1;
    } else if (data['unstructuredDate'].hours) {
      data['unstructuredDate'].seconds = 59;
      data['unstructuredDate'].minutes = 59;
      data['unstructuredDate'].hours -= 1;
    } else if (data['unstructuredDate'].days) {
      data['unstructuredDate'].seconds = 59;
      data['unstructuredDate'].minutes = 59;
      data['unstructuredDate'].hours = 23;
      data['unstructuredDate'].days -= 1;
    } else destroyTimeOut(data);
    updateValues(data['id'], data['unstructuredDate']);
  }, 1000);
}

function updateValues(id, date) {
  try {
    document.querySelector(
      `#reminder-row-${id} .reminder-wrapper .reminder-date .seconds .reminder-value`
    ).innerHTML = turnIntoString(date.seconds, 2, '0');
    document.querySelector(
      `#reminder-row-${id} .reminder-wrapper .reminder-date .minutes .reminder-value`
    ).innerHTML = turnIntoString(date.minutes, 2, '0');
    document.querySelector(
      `#reminder-row-${id} .reminder-wrapper .reminder-date .hours .reminder-value`
    ).innerHTML = turnIntoString(date.hours, 2, '0');
    document.querySelector(
      `#reminder-row-${id} .reminder-wrapper .reminder-date .days .reminder-value`
    ).innerHTML = turnIntoString(date.days, 3, '0');
  } catch (e) {
    reminders.forEach(destroyTimeOut);
  }
}

function destroyTimeOut(item) {
  clearInterval(item['counter']);
  delete item['counter'];
}

function removeReminver(id) {
  document.querySelector(`#reminder-row-${id}`).remove();
  const index = reminders.findIndex(item => item.id == id);

  destroyTimeOut(reminders[index]);
  reminders.splice(index, 1);
}
