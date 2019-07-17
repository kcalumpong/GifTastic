$(document).ready(function () {

    var moods = ["Happy", "Sad", "Cheerful", "Angry", "Funny", "Romantic", "Mysterious", "Tired", "Cranky", "Flirty", "Amused", "Goofy", "Peaceful", "Optimistic"];

    //buttons for original array
    function renderButtons() {
        $("#buttons-view").empty();

        //for loop to create buttons, run through all the moods and append to buttons view
        for (var i = 0; i < moods.length; i++) {
            var m = $("<button>");
            m.addClass("moodClass")
            m.attr("data-name", moods[i]);
            m.text(moods[i]);
            $("#buttons-view").append(m);

        }
    }
    //call the function 
    renderButtons();


    //adds a button for mood entered
    $("#add-mood").on("click", function (event) {
        event.preventDefault();

        var mood = $("#moods-input").val().trim();
        moods.push(mood);
        renderButtons();
    });

    $(document).on("click", ".moodClass", displayMoods);

    function displayMoods(e) {
        console.log('mood clicked', this, $(this))
        var thisMood = $(this).attr("data-name");

        var jQueryURL = ("https://api.giphy.com/v1/gifs/search?q=" +
            thisMood + "&api_key=EmDjuvzgigoYD91Dc7RT9AxOWcYNZroh&limit=10");

        $.ajax({
            url: jQueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");

                var moodImage = $("<img>");
               
                moodImage.attr('src', results[i].images.original_still.url);
                moodImage.attr('data-still', results[i].images.original_still.url);
                moodImage.attr('data-state', 'still');
                moodImage.addClass('gif');
                moodImage.attr('data-animate', results[i].images.original.url);
         
            gifDiv.append(moodImage)
    

            $("#giphy-view").prepend(gifDiv);
                  
            }
           
        })

    }

    

       

})

