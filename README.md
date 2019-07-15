# LIRI Bot

### Developer's Notes

We worked with nodejs for this assignment. It consisted of taking different node packages and using them to query different APIs and then display the results in a terminal window.

### The Final Results

![](https://github.com/cf512/LiriBot/raw/master/assets/images/01-spotify-this-song.png)

In the above screenshot, `node liri.js concert-this <artist/band name here>` searches the Bands in Town Artist Events API for an artist and renders the following information about each event to the terminal: name of the venue, venue location, and date of the Event (use moment to format this as "MM/DD/YYYY").

![](https://github.com/cf512/LiriBot/raw/master/assets/images/02-spotify-this-song.png)

If no song is provided then it defaults to "The Sign" by Ace of Base.

![](https://github.com/cf512/LiriBot/raw/master/assets/images/03-movie-this.png)

In the above screenshot, `node liri.js movie-this '<movie name here>'` will output specific details about the movie. We used the `axios` package to retrieve data from the OMDB API.

![](https://github.com/cf512/LiriBot/raw/master/assets/images/04-movie-this.png)

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' 

![](https://github.com/cf512/LiriBot/raw/master/assets/images/05-do-what-it-says.png)

Using the fs Node package, we read the text inside of random.txt and then use it to call one of LIRI's commands. It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

---

For posterity, the original assignment notes can be found here: assignment.md. 