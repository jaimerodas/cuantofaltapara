function loadTrips() {
  const upcomingTrips = trips.filter(trip => {
    const now = new Date().getTime()
    const arrive = new Date(trip.return).getTime()
    return arrive - now > 0
  })

  if (upcomingTrips.length === 0) return;

  document.querySelector("body").innerHTML = "";
  upcomingTrips.forEach(createTrip)
}

function createTrip(trip, pos) {
  let now, depart, arrive;

  now    = new Date().getTime();
  depart = new Date(trip.depart).getTime();
  arrive = new Date(trip.return).getTime();

  if ((now - depart) > 0) {
    createTripNode(trip.destination, arrive, "trip-"+pos, "regreso de");
    return;
  }

  createTripNode(trip.destination, depart, "trip-"+pos, "salida a");
}

function createTripNode(name, date, id, direction) {
  document.querySelector("body").innerHTML += domTag(
    "article",
    collect(
      domTag("div", direction, {class: "direction"}),
      domTag("h1", name),
      domTag("section", createTimeBlocks)
    ),
    {id: id}
  );

  countdown(id, date);

  function createTimeBlocks() {
    const names = {
      days: "días", hours: "horas", minutes: "mins", seconds: "segs"
    };
    return Object.keys(names).reduce((html, name) => {
      return html += domTag("div", collect(
        domTag("span", "00", {class: "value " + name}),
        domTag("span", names[name], {class: "key"})
      ), { class: "time-block" });
    }, "");
  }
}

function countdown(element, endDate) {
  let days, hours, minutes, seconds;

  if (isNaN(endDate)) return;

  setInterval(calculate, 1000);

  function calculate() {
    let startDate = new Date().getTime();
    let timeRemaining = parseInt((endDate - startDate) / 1000);

    if (timeRemaining >= 0) {
      updateTime(element, timeRemaining);
    } else {
      updateTime(element, 0);
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

function domTag(name, content, options = {}) {
  if (typeof content == "function") content = content();
  let html = "<" + name;
  for (let key in options) html += " " + key + "=\""+ options[key] +"\"";
  html += ">" + content + "</" + name + ">";
  return html;
}

function collect(...nodes) {
  return nodes.reduce((html, item) => {
    if (typeof item == "function") item = item();
    return html += item;
  }, "");
}

document.addEventListener("DOMContentLoaded", loadTrips);
