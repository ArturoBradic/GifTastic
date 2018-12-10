$(document).ready(function () {

    // VARIABLES

    var topics = ["V for Vendetta", "Shape of Water", "Boyhood"];
    console.log(topics);


    // FUNCTIONS


    // Creates buttons from array

    function createBtn() {
        for (var i = 0; i < topics.length; i++) {
            var newBtn = $("<button>");
            newBtn.addClass("btn btn-dark");
            newBtn.attr("data-name", topics[i]);
            newBtn.text(topics[i]);
            $('#buttons').append(newBtn);
            
        }
    };

    // On click button function to display gifs

    $(":button").on("click", function () {

        var gifData = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gifData + "&api_key=kZm5kNYwT7ITf3OJuAtjyt6jeIb6MJkk&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                var image = $("<img>");
                image.attr("src", results[i].images.fixed_height.url);

                gifDiv.append(p);
                gifDiv.append(image);

                $("#display").prepend(gifDiv);
            }


        })
        console.log(response);

    })

    // Calling the creatBtn function to display the intial buttons
    createBtn();

})