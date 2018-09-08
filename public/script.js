function loadTrips() {
  if (trips.length === 0) {
    return;
  }

  document.querySelector('body').innerHTML = '';

  for (var i = 0; i < trips.length; i++) {
    let trip = trips[i];
    createTrip(trip, i);
  }
}

function createTrip(trip, pos) {
  let now, depart, arrive;

  now    = new Date().getTime();
  depart = new Date(trip.depart).getTime();
  arrive = new Date(trip.return).getTime();

  if ((now - arrive) > 0) return;

  if ((now - depart) > 0) {
    createTripNode(trip.destination, arrive, 'trip-'+pos, 'regreso de');
    return;
  }

  createTripNode(trip.destination, depart, 'trip-'+pos, 'salida a');
}

function createTripNode(name, date, id, direction) {
  document.querySelector('body').innerHTML += createHTML();
  countdown(id, date);

  function createHTML() {
    let html = '<article id="'+ id +'">';
    html += '<h1><span class="direction">'+direction+'</span> '+name+'</h1>';
    html += '<section>';
    html += createTimeBlock('days');
    html += createTimeBlock('hours');
    html += createTimeBlock('minutes');
    html += createTimeBlock('seconds');
    html += '</section>';
    html += '</article>';
    return html
  }

  function createTimeBlock(type) {
    let html = '<div class="time-block">';
    let names = {
      'days': 'días',
      'hours': 'horas',
      'minutes': 'mins',
      'seconds': 'segs'
    }
    html += '<span class="value '+ type +'">00</span>';
    html += '<span class="key">'+ names[type] +'</span>';
    html += '</div>';
    return html;
  }
}

function countdown(element, endDate) {
  let days, hours, minutes, seconds;

  if (isNaN(endDate)) {
    return;
  }

  setInterval(calculate, 1000);

  function calculate() {
    let startDate = new Date().getTime();
    let timeRemaining = parseInt((endDate - startDate) / 1000);

    if (timeRemaining >= 0) {
      updateTime(element, timeRemaining)
    } else {
      updateTime(element, 0)
    }
  }

  function updateTime(element, timeRemaining) {
    element = document.getElementById(element);
    days = parseInt(timeRemaining / 86400);
    timeRemaining = (timeRemaining % 86400);

    hours = parseInt(timeRemaining / 3600);
    timeRemaining = (timeRemaining % 3600);

    minutes = parseInt(timeRemaining / 60);
    timeRemaining = (timeRemaining % 60);

    seconds = parseInt(timeRemaining);

    element.querySelector(".days").innerHTML = parseInt(days, 10);
    element.querySelector(".hours").innerHTML = ("0" + hours).slice(-2);
    element.querySelector(".minutes").innerHTML = ("0" + minutes).slice(-2);
    element.querySelector(".seconds").innerHTML = ("0" + seconds).slice(-2);
  }
}

document.addEventListener("DOMContentLoaded", loadTrips);
