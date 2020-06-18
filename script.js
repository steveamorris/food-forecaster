//api key: 0ce7367ab45a6a2137dd7b5c89797579
//Application Id: 1dd4c6ab
$(document).ready(function () {

  $("#search").on("click", citySearch);

  function citySearch(event) {
    event.preventDefault()
    var city = $("#city-search").val();
    // var queryURLCurrent =
    //   "https://api.openweathermap.org/data/2.5/weather?q=" +
    //   city +
    //   "&units=imperial&appid=6f1f4727eeab75aa99bbdae6e23dda36";
    var queryURLCurrent =
      "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=6f1f4727eeab75aa99bbdae6e23dda36";

    $.ajax({
      url: queryURLCurrent,
      method: "GET",
    }).then(function (response) {

      $("#current-time-date").text(
        response.name + " " + moment().format("MM/DD/YYYY")
      );

      var iconEl = $("<img>");
      iconEl.attr(
        "src",
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );

      var temp = response.main.temp;
      var feelsLike = response.main.feels_like
      var humidity = response.main.humidity
      var discription = repsonse.weather.description
      var pressure = response.main.pressure
      var wind = response.wind.speed;

    //   $("#current-time-date").append(iconEl);
    //   $("#current-temp").text("Temperature: " + response.main.temp + " F");
    //   $("#current-humid").text("Humidity: " + response.main.humidity + "%");
    //   $("#current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    });
  }
});
