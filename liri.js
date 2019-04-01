// code to read and set any environment variables with the dotenv package
require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var chalk = require("chalk");

// code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");

// variable to pull spotify keys
var spotify = new Spotify(keys.spotify);
// test whether it logs output
// console.log(spotify);

// ======================== DATA CAPTURE ======================== //

    // variable to capture the third element after "node liri.js ___"
    var action = process.argv[2];
    // variable to capture the fourth element and beyond after "node liri.js ___"
    var searchTerms = process.argv.slice(3).join(" ");

// ======================== BANDS IN TOWN ======================== //

if (action == "concert-this") {

    // =================== Usage ======================= //
    // node liri.js concert-this <artist/band name here>
    // ================================================= //

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

    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    var searchTerms = "";
    if (process.argv[3]){
        searchTerms =  process.argv.slice(3).join(" ");
    }
    else {
        searchTerms = "the sign ace of base";
        console.log("We'll search for The Sign by Ace of Base since you didn't specify.");
    }

    spotify
    .search({ type: 'track', query: searchTerms })
    .then(function(response) {
        // console.log(response.tracks.items[0].artists);

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
}

// ======================== OMDB SEARCH ======================== //

else if (action == "movie-this") {

    // =================== Usage ======================= //
    // node liri.js movie-this <movie title here>
    // ================================================= //

    if (process.argv[3]){
        searchTerms =  process.argv.slice(3).join(" ");
    }
    else {
        searchTerms = "Mr. Nobody";
        console.log("We'll search for Mr. Nobody since you didn't specify.");
    }

    // This will search the OMDB API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

    axios.get("https://www.omdbapi.com/?t=" + searchTerms + "&apikey=trilogy")
        
    .then(function(response) {

        // This will output the following information to your terminal/bash window:

        // * Title of the movie.

        console.log("\n========================\nMovie-This (the results):\n" + chalk.yellow(response.data.Title.toUpperCase()));

        // * Year the movie came out.
        console.log("from the year:\n" + chalk.green(response.data.Year));

        // * IMDB Rating of the movie.
        console.log("with an IMDB rating:\n" + chalk.green(response.data.imdbRating));

        // * Rotten Tomatoes Rating of the movie.
        console.log("with a Rotten Tomatoes rating:\n" + chalk.green(response.data.Ratings[1].Value));

        // * Country where the movie was produced.
        console.log("which was produced in the country:\n" + chalk.green(response.data.Country));

        // * Language of the movie.
        console.log("in the language of:\n" + chalk.green(response.data.Language));

        // * Plot of the movie.
        console.log("with a plot involving:\n" + chalk.green(response.data.Plot));
        
        // * Actors in the movie.
        console.log("and actors in the movie including:\n" + chalk.green(response.data.Actors) + "\n========================\n");
        })

    .catch(function(err) {
    console.log(err);
    });


    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    // If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

    // It's on Netflix!

    // You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.
    
// }
// else if (action == "do-what-it-says") {
}