require("dotenv").config();

const keys = require("./keys"); // could also be "./keys"
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const fs = require('fs')
const OMDBrequest = require('request');

const arg3 = process.argv.slice(3).join('+');
runApp(process.argv[2], arg3);

//  fs.writeFile("./log.txt", "Inception, Die Hard", function(err){
// NOT SURE WHAT TO DO WITH THIS
// })

function runApp(command, arg3) {
    if (command === "movie-this" && arg3 != "") {
        Movie(arg3);
    }
    else if (command === "movie-this" && arg3 === "") {
        arg3 = "Mr+Nobody";
        Movie(arg3);
    }
    else if (command === "my-tweets") {
        Tweets(arg3);
    }
    else if (command === "spotify-this-song" && arg3 != "") {
        Spotified(arg3);
    }
    else if (command === "spotify-this-song" && arg3 === "") {
        arg3 = "Ace of Base: The Sign";
        Spotified(arg3);
    }
    else if (command === "do-what-it-says") {
        doIt(arg3);
    }
    else {
        console.log("You have not specified the correct command \nTry: movie-this, spotify-this-song, my-tweets, or do-what-it-says");
    }
};

function Movie(movieName) {

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    OMDBrequest(queryUrl, function (err, response, data) {

        if (!err && response.statusCode === 200) {
            let obj = JSON.parse(data)
            console.log('')
            console.log("Title: " + obj.Title);
            console.log("Release Year: " + obj.Year);
            console.log("IMDB Rating: " + obj.imdbRating);
            console.log("Rotten Tomatoes rating: " + obj.Ratings[1].Value);
            console.log("Production Location: " + obj.Country);
            console.log("Language: " + obj.Language);
            console.log("Movie Plot: " + obj.Plot);
            console.log("Main Actors: " + obj.Actors);
        }
        else {
            return console.log("ERROR");
        }
    })
};

function Tweets() {

    const client = new Twitter(keys.twitter);

    client.get('statuses/home_timeline', function (error, tweets, response) {//Could add parameters to only include my own tweets but it's more fun to look at others and view updates

        if (!error) {

            for (let i = 0; i < tweets.length; i++) {
                console.log([i + 1] + '. User name: ' + tweets[i].user.name);
                console.log('Tweeted on: ' + tweets[i].created_at);
                console.log("Tweet: " + tweets[i].text);
                console.log("");
            }
        }
        else {
            console.log('Error occurred: ' + error);
        }

    })
};

function Spotified(title) {

    const spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: title, limit: 1 }, function (error, data) {

        result = data.tracks.items[0];

        if (!error) {
            console.log("");
            console.log("Artist: " + result.album.artists[0].name);
            console.log("Song name: " + result.name);
            console.log("Album: " + result.album.name);
            console.log("Link: " + result.external_urls.spotify);
        }
        else {
            return console.log('Error occurred: ' + error);
        }

    });

};

function doIt() {
    
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        console.log(dataArr);
        runApp(dataArr[0], dataArr[1]);
    });
};