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
  var veganRestrict = "";
  var vegetarianRestrict = "";
  var peanutRestrict = "";
  var treeNutRestrict = "";
  var sugarRestrict = "";

  function getDietRestrictions() {
    queryURL = "https://api.edamam.com/search?app_id=21bc4c2c&app_key=5729809d1a9d20acc68325bd3944c334" +
    searchTerm;
    if ($("#vegan").prop("checked") == true) {
       var veganRestrict = "&health=vegan";
       queryURL = queryURL + veganRestrict;
    } else if ($("#vegan").prop("checked") == false) {
      console.log("Checkbox is unchecked.");
      queryURL = queryURL;
    }
    if ($("#vegetarian").prop("checked") == true) {
      console.log("vegetarian is checked.");
      vegetarianRestrict = "&health=vegetarian";
      queryURL = queryURL + vegetarianRestrict;
    } else if ($("#vegetarian").prop("checked") == false) {
      console.log("Checkbox is unchecked.");
      queryURL = queryURL;
    }
    if ($("#peanut-allergy").prop("checked") == true) {
      console.log("peanut-allergy is checked.");
      peanutRestrict = "&health=peanut-free";
      queryURL = queryURL + peanutRestrict;

    } else if ($("#peanut-allergy").prop("checked") == false) {
      console.log("Checkbox is unchecked.");
      queryURL = queryURL;
    }
    if ($("#tree-nut-allergy").prop("checked") == true) {
      console.log("tree-nut-allergy is checked.");
      treeNutRestrict = "&health=tree-nut-free";
      queryURL = queryURL + treeNutRestrict;
    } else if ($("#tree-nut-allergy").prop("checked") == false) {
      console.log("Checkbox is unchecked.");
      queryURL = queryURL;
    }
    if ($("#sugar-conscious").prop("checked") == true) {
      console.log("dairy-intolerance is checked.");
      sugarRestrict = "&health=sugar-conscious";
      queryURL = queryURL + sugarRestrict;

    } else if ($("#dairy-intolerance").prop("checked") == false) {
      console.log("Checkbox is unchecked.");
      queryURL = queryURL;
    }
    // console.log(queryURL);
    // return queryURL;
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
      console.log(recipesResult);
      var resultCounter = 0;

      for (var i = 0; i < 5; i++) {
        var recipeEl = $("<li>");
        recipeEl.addClass("listRecipe");
        recipeEl.attr("data-index", JSON.stringify(recipesResult[i].recipe));
        console.log(recipesResult[i])
        recipeEl.text(recipesResult[i].recipe.label);
        $("#recipeList").append(recipeEl);

      }

    }); 

  };

//add a listner for all buttons of class recipes
  $(document).on("click", ".listRecipe", displayRecipe);
  
  // Click event for when the search button is clicked
  $("#searchBtn").on("click", citySearch);
  


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
          console.log(response);
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

  //assuming that there is a recipe array and a list that someone clicked
  function displayRecipe() {
    //get the recipe selected
    var selectedRecipe = $(this).attr("data-index")
    selectedRecipe = JSON.parse(selectedRecipe)
    //change the name, url, and img to the data from the recipe
    console.log(selectedRecipe)

    $("#recipe-name").text(selectedRecipe.label)
    $("#recipe-url").text("Recipe URL: " + selectedRecipe.url)
    $("#recipeImg").attr("src", selectedRecipe.image)
    $("#recipeImg").attr("alt", selectedRecipe.label)
    console.log(selectedRecipe.label)
    console.log(selectedRecipe.url)
    console.log(selectedRecipe.image)
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
});
