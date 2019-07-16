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
        return;
    });

    // alert( $(this).attr('data-name'));

    //where do i put this?
    $(document).on("click", ".mood", displayMoods);

    function displayMoods() {

        moods = $(this).attr("data-name");

        var jQueryURL = ("http://api.giphy.com/v1/gifs/search&q=" +
            moods + "&api_key=EmDjuvzgigoYD91Dc7RT9AxOWcYNZroh&limit=10");

        $.ajax({
            url: jQueryURL,
            method: "GET"
        }).then(function (response) {
            $("#giphy-view").text(JSON.stringify(response));
        })

       



    }

    displayMoods();



})

