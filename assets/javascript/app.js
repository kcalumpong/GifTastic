$(document).ready(function () {

    var moods = ["Paranoid", "Exhausted", "Hiding", "Drenched", "Starving", "Romantic", "Mysterious", "Tired", "Cranky", "Flirty", "Amused", "Goofy", "Peaceful", "Rihanna"];

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
        $("#giphy-view").empty();
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

                moodImage.attr('src', results[i].images.fixed_height.url);
                moodImage.attr('data-still', results[i].images.original_still.url);
                moodImage.attr('data-state', 'animated');

                moodImage.addClass('gif');
                moodImage.attr('data-animate', results[i].images.original.url);

                gifDiv.append(moodImage)


                $("#giphy-view").prepend(gifDiv);


            }

            $(document).on("click", ".gif", function() { 

            var state = $(this).attr("data-state"); 

                if (state === "animated") {
                    $(this).attr("src", $(this).attr("data-still"))
                    $(this).attr("data-state", "still")

                } else { 
                    $(this).attr("src", $(this).attr("data-animate"))
                    $(this).attr("data-state", "animated")

                }


            })
        })



        

    }





})

