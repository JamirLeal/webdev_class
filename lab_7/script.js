let marvel_array = ["Ironman", "Thor", "Captain America", "Hulk", "Hawkeye", "Loki", "Spiderman"]

$(document).ready(function() {
    marvel_array.forEach(element => $("#marvel-buttons").append(`<button class="superhero">${element}</button>`))
    
    $("#add-marvel").click((event) => {
        event.preventDefault();
        if ($("#marvel-input").val() !== '') {
            $("#marvel-buttons").append(`<button class="superhero">${$("#marvel-input").val()}</button>`)
        }
        $("#marvel-input").val('');
    })
    
    $("#marvel-buttons").on("click", ".superhero", function() {
        getGif($(this).text())
    })

    $("#superheroes").on("click", ".super-image", function() {
        if ($(this).attr("data-status") === "stop") {
            const url = $(this).attr("data-play")
            $(this).attr("src", url)
            $(this).attr("data-status", "play")
        } else {
            const url = $(this).attr("data-still")
            $(this).attr("src", url)
            $(this).attr("data-status", "stop")
        }
    })
});

function getGif(searchTerm) {
    console.log('searchTerm is: ', searchTerm)
    $.ajax({
      url: "//api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=10" + "&api_key=yg7aimyUk1JqgjDsJMishJpjOZthzQH2",
      type: "GET",
      success: function(response) {
        console.log(response.data)
        $("#superheroes").children().remove();
        response.data.forEach(element => {
            $("#superheroes").append(`<img class ="super-image" 
                src="${element.images.fixed_height_still.url}" 
                data-still="${element.images.fixed_height_still.url}"
                data-status="stop" 
                data-play="${element.images.fixed_height.url}">`);
            console.log(element.images.fixed_height.url)
        })
    }, error: function(e) {
        alert(e);
      }
    });
  }