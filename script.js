$(document).ready(function() {

//api key: 0ce7367ab45a6a2137dd7b5c89797579
//Application Id: 1dd4c6ab

//Steve edamam apikey "ec4f08b81e8c6fcb3007f7ac8d71f2a9"
// Steve edamam apiid "9113a917"


var appId = "21bc4c2c"
var appKey = "5729809d1a9d20acc68325bd3944c334"
var searchTerm = "&q=chicken";

var queryURL = ("https://api.edamam.com/search?app_id=21bc4c2c&app_key=5729809d1a9d20acc68325bd3944c334" + searchTerm);

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
          
      });

});