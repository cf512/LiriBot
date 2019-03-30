// code to read and set any environment variables with the dotenv package
require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var chalk = require("chalk");

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

// code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");

// variable to pull spotify keys
var spotify = new Spotify(keys.spotify);
// test whether it logs output
// console.log(spotify);

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

// ======================== DATA CAPTURE ======================== //

    // variable to capture the third element after "node liri.js ___"
    var action = process.argv[2];
    // var searchTerms = process.argv.slice(3).join(" ");
    var searchTerms = process.argv[3];
    // var artist = "alabama";

// ======================== BANDS IN TOWN ======================== //

if (action == "concert-this") {

    // USAGE:
    // node liri.js concert-this <artist/band name here>

    // This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

    axios.get("https://rest.bandsintown.com/artists/" + searchTerms + "/events?app_id=codingbootcamp")
        
    .then(function(response) {

        // Echoing the search terms and giving the output a header of sorts

        console.log("\n========================\nThe next show for the artist:\n" + chalk.yellow(searchTerms.toUpperCase()));
        
        // Name of the venue
        console.log("========================\nThe name of the venue:\n" + chalk.green(response.data[0].venue.name));

        // Venue location
        console.log("in the location of:\n" + chalk.green(response.data[0].venue.city + ", " + response.data[0].venue.region + " " + response.data[0].venue.country));

        // Date of the Event (use moment to format this as "MM/DD/YYYY")
        var showDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
        console.log("on the date:\n" + chalk.green(showDate) + "\n========================\n");
    })
    .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
}

// ======================== SPOTIFY SEARCH ======================== //

else if (action == "spotify-this-song") {

    // =================== Usage ======================= //
    // node liri.js spotify-this-song '<song name here>'
    // ================================================= //

    spotify
    .search({ type: 'track', query: searchTerms })
    .then(function(response) {
        console.log(response.tracks.items[0].artists);

        // This will show the following information about the song in your terminal/bash window
        console.log("\n========================\nThe song:\n" + chalk.yellow(searchTerms.toUpperCase()));
            
        // The artist(s)
        console.log("========================\nby the artist(s):\n" + chalk.green(response.tracks.items[0].album.artists[0].name));

        // A preview link of the song from Spotify
        console.log("Click here for a preview link:\n" + chalk.green(response.tracks.items[0].external_urls.spotify));

        // The album that the song is from
        var releaseDate = moment(response.tracks.items[0].album.release_day).format('YYYY');
        console.log("from the album:\n" + chalk.green(response.tracks.items[0].album.name) + " (" + chalk.green(releaseDate) + ")" + "\n========================\n");
    })
    .catch(function(err) {
        console.log(err);
    });

    // If no song is provided then your program will default to "The Sign" by Ace of Base.

    // You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

    // The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:

    // Step One: Visit https://developer.spotify.com/my-applications/#!/

    // Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

    // Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

    // Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.

}
// else if (action == "movie-this") {
    
// }
// else if (action == "do-what-it-says") {

// }