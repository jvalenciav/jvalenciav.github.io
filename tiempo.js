function makeTimer() {
  var endTime = new Date("June 14, 2022 12:00:00 PDT");
  var endTime = Date.parse(endTime) / 1000;

  var now = new Date();
  var now = Date.parse(now) / 1000;

  var timeLeft = endTime - now;

  var days = Math.floor(timeLeft / 86400);
  var hours = Math.floor((timeLeft - days * 86400) / 3600);
  var minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
  var seconds = Math.floor(
    timeLeft - days * 86400 - hours * 3600 - minutes * 60
  );

  if (hours < "10") {
    hours = "0" + hours;
  }
  if (minutes < "10") {
    minutes = "0" + minutes;
  }
  if (seconds < "10") {
    seconds = "0" + seconds;
  }

  $("#days").html(days + "<span>Dias</span>");
  $("#hours").html(hours + "<span>Horas</span>");
  $("#minutes").html(minutes + "<span>Minutos</span>");
  $("#seconds").html(seconds + "<span>Segundos</span>");
}

setInterval(function () {
  makeTimer();
}, 1000);
