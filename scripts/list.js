//popula a lista de lembretes
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
                2,
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
          <img src="../assets/images/trash.svg" alt="Delete" />
        </div>
      </div>
    `;
  });
  document.querySelector('.list-main').innerHTML = remindersHTML;
}

//define as operações de contagem para serem executadas a cada 1000ms
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
    } else {
      destroyTimeOut(data);
      alerEndTimeout(data['id']);
    }
    updateValues(data['id'], data['unstructuredDate']);
  }, 1000);
}

//atualiza o valor do momento atual [dias, horas, etc] no template html
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
    ).innerHTML = turnIntoString(date.days, 2, '0');
  } catch (e) {
    reminders.forEach(destroyTimeOut);
  }
}

//exibe uma mensagem quando o contador zerar
function alerEndTimeout(id) {
  document.querySelector(
    `#reminder-row-${id} .reminder-wrapper .reminder-date`
  ).innerHTML = '<div class="reminder-ends">the date has arrived</div>';
}

//destroi a função settimeout, evitando sobrecarga
function destroyTimeOut(item) {
  if (item['counter']) {
    clearInterval(item['counter']);
    delete item['counter'];
  }
}

//deleta um lembrete
function removeReminver(id) {
  document.querySelector(`#reminder-row-${id}`).remove();
  const index = reminders.findIndex(item => item.id == id);

  destroyTimeOut(reminders[index]);
  reminders.splice(index, 1);
  localStorage.setItem('reminders', JSON.stringify(reminders));
}
