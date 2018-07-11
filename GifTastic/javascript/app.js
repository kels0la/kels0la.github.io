//1.Pausing-gifts assignment will be useful for the on-click events
//2.OXzHjbrxzRU1WRy9HOODdO9SZmRvG5gj is the Giphy API key
//3.https://developers.giphy.com/docs/#operation--gifs-search-get
//4. So the button-trigger-ajax.html is good for calling it. I need that assignment where the user searches for something, and a button is display. From that button, they user can click it, and then boom.
//5. Make sure you switch the protocol in the query URL from http

const Topics = ["Bitcoin","NBA","Arnold Schwarzenegger","Step Brothers","Cats","Will Ferrell","Messi","Poker","Coding","Samuel L. Jackson"]

$(document).ready(function () {

    addButtons()

    function addButtons() {

        for (var i = 0; i < Topics.length; i++) {

            var button = $("<button>")
            button
                .addClass("topics btn btn-sm btn-outline-danger")
                .attr("data-name", Topics[i])
                .text(Topics[i]);
            $(".buttons-div").append(" ", button);
            
        }

    }

    $("#completeSearch").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.

        event.preventDefault();
        $(".buttons-div").empty();

        var addedButton = $("#searchBar").val().trim();
        Topics.push(addedButton);
        addButtons()

    })
    
    function searchResults() {
        
        $(".giphysDiv").empty()
        var searchitem = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchitem + "&api_key=OXzHjbrxzRU1WRy9HOODdO9SZmRvG5gj&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

            console.log(response)
            console.log(queryURL)
  
            // storing the data from the AJAX request in the results variable
            var results = response.data;
  
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
  
              // Creating and storing a div tag
              var GiphyDiv = $("<div>");
  
              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + results[i].rating);
  
              // Creating and storing an image tag
              var Image = $("<img>");
              // Setting the src attribute of the image to a property pulled off the result item
              Image.attr("src", results[i].images.fixed_width_small_still.url);
              Image.attr("data-name", searchitem)
              Image.attr("data-state", "still")
              Image.attr("data-animate", results[i].images.fixed_width_small.url)
              Image.attr("data-still", results[i].images.fixed_width_small_still.url)
              Image.on('click', gifAnimate);

              GiphyDiv.append(p);
              GiphyDiv.append(Image);

              $(".giphysDiv").append(GiphyDiv);
            }

        })
    }

    $(document).on("click", ".topics", searchResults); // On click of a button to display the animations from the .giphy divs
    
    function gifAnimate(){

        var currentState = $(this).attr('data-state');
        var stillGiphy = $(this).attr('data-still');
        var animatedGiphy = $(this).attr('data-animate');

        if (currentState === 'still') {
            $(this).attr('src', animatedGiphy);
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', stillGiphy);
            $(this).attr('data-state', 'still');
        }
    
    }
    
})