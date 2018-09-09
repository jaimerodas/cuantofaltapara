function loadTrips() {
  if (trips.length === 0) {
    return;
  }

  document.querySelector('body').innerHTML = '';

  for (var i = 0; i < trips.length; i++) createTrip(trips[i], i);
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
  document.querySelector('body').innerHTML += createNode(
    'article',
    collectNodes(
      createNode('div', direction, {class: 'direction'}),
      createNode('h1', name),
      createNode('section', createTimeBlocks),
    ),
    {id: id}
  );

  countdown(id, date);

  function createTimeBlocks() {
    let names = {
      'days': 'días',
      'hours': 'horas',
      'minutes': 'mins',
      'seconds': 'segs'
    };

    let html = '';

    for (name in names) {
      html += createNode('div', collectNodes(
        createNode('span', '00', {class: 'value ' + name}),
        createNode('span', names[name], {class: 'key'})
      ), {class: 'time-block'});
    }

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

function createNode(name, content, options = {}) {
  if (typeof content == "function") content = content();
  let html = '<' + name;
  for (key in options) html += ' ' + key + '="'+ options[key] +'"';
  html += ">" + content + "</" + name + ">";
  return html;
}

function collectNodes(...nodes) {
  let html = '';
  nodes.forEach(function(item) {
    if (typeof item == 'function') item = item();
    html += item;
  });
  return html;
}

document.addEventListener("DOMContentLoaded", loadTrips);
