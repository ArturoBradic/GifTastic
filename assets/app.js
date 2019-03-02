$(document).ready(function() {
  // VARIABLES

  var topics = [
    "Pan's Labyrinth",
    "It",
    "Interstellar",
    "The Shape of Water",
    "Pulp Fiction",
    "Amelie",
    "Princess Mononoke",
    "I, Tonya",
    "Shrek"
  ];
  console.log(topics);

  // FUNCTIONS

  // Creates buttons from array

  function createBtn() {
    for (var i = 0; i < topics.length; i++) {
      var newBtn = $("<button>");
      newBtn.addClass("btn btn-dark");
      newBtn.attr("data-name", topics[i]);
      newBtn.text(topics[i]);
      $("#buttons").append(newBtn);
    }
  }

  // On click button function to display gifs

  $(document).on("click", ".btn-dark", function buttonOnclick() {
    console.log("click");

    var gifData = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      gifData +
      "&api_key=kZm5kNYwT7ITf3OJuAtjyt6jeIb6MJkk&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var stillAttr = "_s";
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var image = $("<img>");
        var addTitle = $("<p>").text(gifData);

        image
          .attr("src", results[i].images.fixed_height_still.url)
          .attr("data-still", results[i].images.fixed_height_still.url)
          .attr("data-animate", results[i].images.fixed_height.url)
          .attr("data-state", "still");
        gifDiv.addClass("float-left");
        gifDiv.append(p);
        gifDiv.append(image);

        // $("#topic-name").append(addTitle);

        $("#display").prepend(gifDiv);
      }
    });

    console.log(response);
    console.log("click");
  });

  $(document).on("click", "#add-gif", function(event) {
    event.preventDefault();

    var addSearchToArray = $("#gif-input")
      .val()
      .trim();
    topics.unshift(addSearchToArray);

    console.log(topics);

    var newSearchItem = $("<button>")
      .addClass("btn btn-dark")
      .attr("data-name", addSearchToArray);
    newSearchItem.text(addSearchToArray);
    $("#buttons").prepend(newSearchItem);
  });

  //Onclick animate gif

  $(document).on("click", "img", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  // make each array item into a button and append that to the buttons div
  function addSearchItem() {
    for (i = 0; i < topics.length; i++) {
      var newSearchItem = $("<button>")
        .addClass("btn btn-dark")
        .attr("data-name", addSearchToArray);
      newSearchItem.text(topics[i]);
      $("#buttons").prepend(newSearchItem);
    }
  }

  // Calling the creatBtn function to display the intial buttons
  createBtn();
});
