// code to read and set any environment variables with the dotenv package
require("dotenv").config();

// code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");

// variable to pull spotify keys
var spotify = new Spotify(keys.spotify);
// test whether it logs output
console.log(spotify);

                // ========================BANDSINTOWN======================== //
                // function searchBandsInTown(artist) {

                //     // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
                //     var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
                //     $.ajax({
                //       url: queryURL,
                //       method: "GET"
                //     }).then(function(response) {

                //       // Printing the entire object to console
                //       console.log(response);

                //       // Constructing HTML containing the artist information
                //       var artistName = $("<h1>").text(response.name);
                //     });
                //   }


// ============================================================= //
// Make it so liri.js can take in one of the following commands: //
//
// * concert-this
//
// * spotify-this-song
//
// * movie-this
//
// * do-what-it-says
//
// ============================================================= //

// variable to capture the third element after "node liri.js ___"
var action = process.argv[2];

if (action == "concert-this") {

}
else if (action == "spotify-this-song") {

}
else if (action == "movie-this") {
    
}
else if (action == "do-what-it-says") {

}