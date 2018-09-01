

function countdown(element, endDate) {
  let days, hours, minutes, seconds;

  endDate = new Date(endDate).getTime();

  if (isNaN(endDate)) {
    return;
  }

  setInterval(calculate, 1000);

  function calculate() {
    let startDate = new Date();
    startDate = startDate.getTime();

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

(function () {
  countdown('trip-01', '2018-09-19T08:00:00-05:00');
  countdown('trip-02', '2018-09-27T18:00:00-05:00');
  countdown('trip-03', '2018-10-14T19:00:00-05:00');
})();
