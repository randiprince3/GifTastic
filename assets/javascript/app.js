var animalOpts = ["Dog", "Cat", "Mouse", "Skunk", "Giraffe", "Squirrel", "Horse", "Shark", "Duck"]

function placeButtons(){
    $("#buttons").empty();

    for (var i = 0; i < animalOpts.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("cute");
        newButton.attr("data-name", animalOpts[i]);
        newButton.text(animalOpts[i]);
        $("#buttons").append(newButton);
        console.log(animalOpts);
    }
}

$("#add-animal").on("click", function(){

    event.preventDefault();

     var userInput = $("#animal-input").val().trim();
     // console.log(userInput);
     animalOpts.push(userInput);

     placeButtons();

     $("#animal-input").val("");

     return false;
    

 });


function showGifs() {
    var showAnimal = $(this).attr("data-name");
    console.log(showAnimal);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + showAnimal + "&api_key=PVBhJGCPSa8HGFtQnmPr15dI1rHgpDEo&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        console.log(results);
        
            $("#animal-view").empty();
            
            for (var j = 0; j < results.length; j++) {
                var gifDiv = $("<div class=gifs>");
                var gifView = results[j].images.fixed_height.url;
                var still = results[j].images.fixed_height_still.url;
                // console.log(gifView);

            var gifImage = $("<img>").attr("src", still).attr('data-animate', gifView).attr('data-still', still);
                gifImage.attr('data-state', 'still');
                gifImage.addClass('gif');
                gifDiv.append(gifImage);
                $("#animal-view").prepend(gifDiv);
                gifImage.on("click", playGif);
                
            var rating = results[j].rating;
                // console.log(rating);
            var showRating = $("<p>").text("Rating: " + rating);
            $("#animal-view").prepend(showRating);
        }

    })




        function playGif() {
            var state = $(this).attr("data-state");
            // console.log(state);

            if (state === "still"){
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }
        }

    };

    

    $(document).on("click", ".cute", showGifs);

    placeButtons();

    