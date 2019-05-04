$(document).ready(function () {

    // Initial array of gif buttons
    var myButtons = ["Thanos", "Porsche", "iPhone", "Cat", "Top Gear", "Airplanes", "Ferrari", "BMW", "Jet Fighter", "Seattle"];

    // re-render function
    function displayGifInfo() {

        var gifSearch = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=lYtg53GESIm2Z71T7ddHzHdzmX5p34XK&limit=10";

        $.ajax({   //AJAX call for the specific search button being clicked
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.data;
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var gifImage = $("<img>");
                gifImage.addClass("gif");
                gifDiv.addClass("float-left gifDiv");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifDiv.append(p);
                gifDiv.prepend(gifImage);
                $("#gifs-appear-here").prepend(gifDiv);
            }
        });
        $("#gif-info-text").html("Click gifs to activate and deactivate")
    }

    // Function for displaying gif data
    function renderButtons() {
        $("#buttons-view").empty();  //so buttons don't repeat
        // Looping through the array of fav gifs
        for (var i = 0; i < myButtons.length; i++) {
            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("gif-btn btn");
            // Adding a data-attribute
            a.attr("data-name", myButtons[i]);
            // Providing the initial button text
            a.text(myButtons[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }


    // This function handles events where a movie button is clicked
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var search = $("#movie-input").val().trim();
        if (search !== "") { //So you can't enter empty no conent buttons
        // Adding search from the textbox to our array
        myButtons.push(search);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
        }
    });

    function imageState() { //to pause and play gifs
        var state = $(this).attr("data-state");
        
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
        console.log(state);
    }

    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".gif-btn", displayGifInfo);
    $(document).on("click", ".gif", imageState);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});
