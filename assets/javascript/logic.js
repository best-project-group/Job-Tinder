 
function createCard() {

    $("#card-div").empty();

    $("#card-div").html(
    "<div class='card'>" +
        "<h5 class='card-header' id='event'></h5>" +
        "<div class='card-body'>" +
            "<h5 class='card-title' id='venue'></h5>" +
            "<p class='card-text' id='description'></p>" +
            "<a href='#' class='btn btn-primary' id='external-link'>" + "Find Out More" + "</a>" +
        "</div>" +
    "</div>"
    )

}
    
function pullEvent() {

    var eventObject = {
        app_key: "wTFBTHnT7b7cPP6n" ,
        q: $("#what").val(),
        where: "cleveland",
        date: "2013061000-2019062000",
        include: "tags,categories",
        page_size: 1,
        sort_order: "popularity",
    };

    EVDB.API.call("/events/search", eventObject, function(oData) {

        event = oData.events.event;

        for (i = 0; i < event.length; i++) {

            console.log(event[i]);

            $("#event").append(event[i].title);
            $("#description").append(event[i].description);
            $("#venue").append(event[i].venue_name);
            $("#external-link").attr("href", event[i].url);



            function pullDate() {

     
                startTime = moment(new Date(event[i].start_time)).format("LLLL");
                timeToDoors = moment().to(startTime)

                $("#description").append(startTime + "<br>" + timeToDoors)


            }

            pullDate();
        }

    });
}







$(document).ready(function() {
    
    $(".test").on("click", function(event) {
        event.preventDefault();
        createCard();
        pullEvent();

    

    })


})

