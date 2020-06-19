$(document).ready(function () {
  //api key: 0ce7367ab45a6a2137dd7b5c89797579
  //Application Id: 1dd4c6ab

  //Steve edamam apikey "ec4f08b81e8c6fcb3007f7ac8d71f2a9"
  // Steve edamam apiid "9113a917"

  var appId = "21bc4c2c";
  var appKey = "5729809d1a9d20acc68325bd3944c334";
  var searchTerm = "&q=chicken";
  var dietRestrict = [];

  function getDietRestrictions() {
    if ($("#vegan").prop("checked") == true) {
      console.log("Vegan is checked.");
      dietRestrict.push("vegan");
    } else if ($("#vegan").prop("checked") == false) {
      console.log("Checkbox is unchecked.");
    }
    if ($("#vegetarian").prop("checked") == true) {
      console.log("vegetarian is checked.");
      dietRestrict.push("vegetarian");
    } else if ($("#vegetarian").prop("checked") == false) {
      console.log("Checkbox is unchecked.");
    }
    if ($("#peanut-allergy").prop("checked") == true) {
      console.log("peanut-allergy is checked.");
      dietRestrict.push("peanut-free");
    } else if ($("#peanut-allergy").prop("checked") == false) {
      console.log("Checkbox is unchecked.");
    }
    if ($("#tree-nut-allergy").prop("checked") == true) {
      console.log("tree-nut-allergy is checked.");
      dietRestrict.push("tree-nut-free");
    } else if ($("#tree-nut-allergy").prop("checked") == false) {
      console.log("Checkbox is unchecked.");
    }
    if ($("#dairy-intolerance").prop("checked") == true) {
      console.log("dairy-intolerance is checked.");
      dietRestrict.push("dairy-free");
    } else if ($("#dairy-intolerance").prop("checked") == false) {
      console.log("Checkbox is unchecked.");
    }
    console.log(dietRestrict);
  }
  // end of getDietRestrictions
  var queryURL =
    "https://api.edamam.com/search?app_id=21bc4c2c&app_key=5729809d1a9d20acc68325bd3944c334" +
    searchTerm;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });

  // Click event for when the search button is clicked
  $("#searchBtn").on("click", citySearch);

  //Function for searching a city and getting data and displaying data on the weather
  function citySearch(event) {
    event.preventDefault();
    getDietRestrictions();

    var lon;
    var lat;
    //get current geolocation
    navigator.geolocation.getCurrentPosition(
      function (position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        lat = lat.toFixed(2)
        lon = lon.toFixed(2)

        var queryURLCurrent =
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          lon +
          "&units=imperial&appid=6f1f4727eeab75aa99bbdae6e23dda36";

        //ajax call to get the current weather
        $.ajax({
          url: queryURLCurrent,
          method: "GET",
        }).then(function (response) {
          console.log(response);
          //change the city name to the date and time
          $("#currentCity").text(
            response.name + " " + moment().format("MM/DD/YYYY")
          );
          //get the icon of the weather
          var iconEl = $("<img>");
          iconEl.attr(
            "src",
            "http://openweathermap.org/img/w/" +
              response.weather[0].icon +
              ".png"
          );
          //get different weather data
          var temp = response.main.temp;
          var feelsLike = response.main.feels_like;
          var humidity = response.main.humidity;
          var description = response.weather[0].main;
          var pressure = response.main.pressure;
          var wind = response.wind.speed;
          //append the weather data
          $("#currentCity").append(iconEl);
          $("#temperature").text(response.main.temp + " F");
          $("#humidity").text(response.main.humidity + "%");
          $("#windspeed").text(response.wind.speed + " MPH");
        });
      },
      //call if geolocation  is not specified
      function () {
        alert("Geo Location not supported");
      }
    );
  }
});
