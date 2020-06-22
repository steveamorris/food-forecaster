$(document).ready(function () {
  //api key: 0ce7367ab45a6a2137dd7b5c89797579
  //Application Id: 1dd4c6ab

  //Steve edamam apikey "ec4f08b81e8c6fcb3007f7ac8d71f2a9"
  // Steve edamam apiid "9113a917"

  var appId = "21bc4c2c";
  var appKey = "5729809d1a9d20acc68325bd3944c334";
  var searchTerm = "&q=chicken";
  var dietRestrict = [];
  var queryURL =
    "https://api.edamam.com/search?app_id=21bc4c2c&app_key=5729809d1a9d20acc68325bd3944c334" +
    searchTerm;
    // + veganRestrict + vegetarianRestrict + peanutRestrict + treeNutRestrict + sugarRestrict

  function getDietRestrictions() {
    queryURL = "https://api.edamam.com/search?app_id=21bc4c2c&app_key=5729809d1a9d20acc68325bd3944c334" +
    searchTerm;
    if ($("#vegan").prop("checked") == true) {
       var veganRestrict = "&health=vegan";
       queryURL = queryURL + veganRestrict;
    }
    if ($("#vegetarian").prop("checked") == true) {
      console.log("vegetarian is checked.");
      var vegetarianRestrict = "&health=vegetarian";
      queryURL = queryURL + vegetarianRestrict;
    }
    if ($("#peanut-allergy").prop("checked") == true) {
      console.log("peanut-allergy is checked.");
      var peanutRestrict = "&health=peanut-free";
      queryURL = queryURL + peanutRestrict;
    }
    if ($("#tree-nut-allergy").prop("checked") == true) {
      console.log("tree-nut-allergy is checked.");
      treeNutRestrict = "&health=tree-nut-free";
      queryURL = queryURL + treeNutRestrict;
    }
    if ($("#sugar-conscious").prop("checked") == true) {
      console.log("dairy-intolerance is checked.");
      sugarRestrict = "&health=sugar-conscious";
      queryURL = queryURL + sugarRestrict;
    }
    getRecipes();
    
    // queryURL = '';
  }
  // end of getDietRestrictions
  function getRecipes(){
    // console.log("queryURL inside getRecipe" + queryURL);
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // console.log(response);
      var recipesResult = (response.hits);
      var resultCounter = 0;

      for (var i = 0; i < 5; i++) {
        var recipeEl = $("<li>");
        recipeEl.addClass("listRecipe");
        recipeEl.attr("data-index", JSON.stringify(recipesResult[i].recipe));
        recipeEl.text(recipesResult[i].recipe.label);
        $("#recipeList").append(recipeEl);

      }

    }); 

  };

//add a listner for all buttons of class recipes
  $(document).on("click", ".listRecipe", displayRecipe);
  
  // Click event for when the search button is clicked
  $("#searchBtn").on("click", citySearch);

  //click event for returning to the recipe page
  $("#goBackBtn").on("click", function(event){
    event.preventDefault()
    switchDisplay("secondPage");
  })


  //function to switcht the display of the page
  function switchDisplay(toDisplay) {
    if (toDisplay === "firstPage") {
      $("#firstPage").attr("style", "display: block;");
      $("#secondPage").attr("style", "display: none;");
      $("#thirdPage").attr("style", "display: none;");
    } else if (toDisplay === "secondPage") {
      $("#firstPage").attr("style", "display: none;");
      $("#secondPage").attr("style", "display: block;");
      $("#thirdPage").attr("style", "display: none;");
    } else if (toDisplay === "thirdPage") {
      $("#firstPage").attr("style", "display: none;");
      $("#secondPage").attr("style", "display: none;");
      $("#thirdPage").attr("style", "display: block;");
    }
  }

  //Function for searching a city and getting data and displaying data on the weather
  function citySearch(event) {
    event.preventDefault();
    getDietRestrictions();

    var lon;
    var lat;
    //get current geolocation
    navigator.geolocation.getCurrentPosition(
      function (position) {
        switchDisplay("secondPage");
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        lat = lat.toFixed(2);
        lon = lon.toFixed(2);

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
          //change the city name to the date and time
          $("#currentCity").text(
            response.name + " " + moment().format("MM/DD/YYYY")
          );
          //get the icon of the weather
          var iconEl = $("<img>");
          iconEl.attr(
            "src",
            "https://openweathermap.org/img/w/" +
              response.weather[0].icon +
              ".png"
          );
          //get different weather data some to be used
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

  //assuming that there is a recipe array and a list that someone clicked
  function displayRecipe() {
    //get the recipe selected
    var selectedRecipe = $(this).attr("data-index")
    selectedRecipe = JSON.parse(selectedRecipe)
    //change the name, url, and img to the data from the recipe

    $("#recipe-name").text(selectedRecipe.label)
    $("#recipe-url").text("Recipe URL: " + selectedRecipe.url)
    $("#recipeImg").attr("src", selectedRecipe.image)
    $("#recipeImg").attr("alt", selectedRecipe.label)
    //change the ingredients box to include the ingrediants needed
    $("#ingredients-box").empty();
    var ingredientsHeader = $("<h5>Ingrediants:<h5>")
    $("#ingredients-box").append(ingredientsHeader);
    var ingredientsList = $("<ul>");

    //add each recipe to the list
    for(var i = 0; i <selectedRecipe.ingredientLines.length;i++){
      var newingredient = $("<li>")
      newingredient.text(selectedRecipe.ingredientLines[i]);
      ingredientsList.append(newingredient) //maybe prepend
    }
    //append the list to the recipe
    $("#ingredients-box").append(ingredientsList)
    //switch the display to the third page
    switchDisplay("thirdPage");
  }
function weatherToFood(){
  // console.log("weather to food " + temp)

  var temp = 82
  var temp1 = temp.toString()
  var temp2 = temp1[1]
  temp1 = temp1[0]
  var wind = 5.4
  wind = wind.toString()
  wind = wind[0];
  var main = "Clear"

  var calories;
  var time;
  var queryMeal;
  var secondQuery;
  var thirdQuery;
  
  switch (temp1){
    case "1": calories = "&calories=1101+"; break;
    case "2": calories = "&calories=1001-1100"; break;
    case "3": calories = "&calories=901-1000"; break;
    case "4": calories = "&calories=801-900"; break;
    case "5": calories = "&calories=701-800"; break;
    case "6": calories = "&calories=601-700"; break;
    case "7": calories = "&calories=501-600"; break;
    case "8": calories = "&calories=401-500"; break;
    case "9": calories = "&calories=301-400"; break;
    default: calories = "&calories=301-400"; break;
  }
  switch (temp2){
    case "0": queryMeal = "&q=lamb";  break;
    case "1": queryMeal = "&q=chicken"; break;
    case "2": queryMeal = "&q=roast"; break;
    case "3": queryMeal = "&q=pork"; break;
    case "4": queryMeal = "&q=turkey"; break;
    case "5": queryMeal = "&q=chicken"; break;
    case "6": queryMeal = "&q=beef"; break;
    case "7": queryMeal = "&q=chicken"; break;
    case "8": queryMeal = "&q=fish"; break;
    case "9": queryMeal = "&q=cheese"; break;
    default: queryMeal = "&q=chicken"; break;
  }
  switch(main){
    case "Thunderstorm": secondQuery = "noodles"; break;
    case "Drizzle": secondQuery = "sandwich"; break;
    case "Rain": secondQuery = "casserole"; break;
    case "Snow": secondQuery = "hearty"; break;
    case "Clear": secondQuery = "sandwich"; break;
    case "Clouds": secondQuery = "dinner"; break;
    default: secondQuery = "sandwich"; break;
  }
  // switch(wind){
  //   case ".": thirdQuery = "chicken"; break;
  //   case "1": thirdQuery = "chicken"; break;
  //   case "2": thirdQuery = "chicken"; break;
  //   case "3": thirdQuery = "chicken"; break;
  //   case "4": thirdQuery = "chicken"; break;
  //   case "5": thirdQuery = "chicken"; break;
  //   case "6": thirdQuery = "chicken"; break;
  //   case "7": thirdQuery = "chicken"; break;
  //   case "8": thirdQuery = "chicken"; break;
  //   case "9": thirdQuery = "chicken"; break;
  //   default: thirdQuery = "chicken"; break;
  // }
  console.log(temp2);
  console.log(queryMeal);
  // console.log(temp1);
  // console.log(temp2);
  console.log(calories);
}


});
