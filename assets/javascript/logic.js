/* REMOVES ANY EXISTING CARD AND CREATES BLANK HTML TEMPLATE */ 
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


/* RETRIEVES REQUESTED EVENT INFO AND FILLS THE BLANK CARD*/
function pullEvent() {

    /* DEFINES THE PARAMETERS TO CHECK AGAINST THE API */
    var eventObject = {
        app_key: "wTFBTHnT7b7cPP6n" ,
        q: $("#what").val(),
        where: "cleveland",
        date: "2013061000-2019062000",
        include: "tags,categories",
        page_size: 1,
        sort_order: "popularity",
    };

    /* SEARCHES THE API USING EVENTOBJECT */
    EVDB.API.call("/events/search", eventObject, function(objectData) {

        /* SIMPLIFIES LATER ENTRIES */
        event = objectData.events.event;

        /* LOOPS THROUGH THE RETRIEVED EVENT LIST */
        for (i = 0; i < event.length; i++) {

            console.log(event[i]);

            /* FORMATS THE UGLY DATE GIVEN BY THE API AND APPENDS TO THE CARD */
            function pullDate() {
     
                startTime = moment(new Date(event[i].start_time));
                timeToDoors = moment().to(startTime)
                formattedStart = moment(startTime).format("LLLL");

                $("#description").append(formattedStart + "<br>" + timeToDoors)

            }

            /* APPENDS OTHER INFORMATION TO CARD AND ATTACHES THE LINK TO THE BUTTON */
            $("#event").append(event[i].title);
            $("#venue").append(event[i].venue_name);
            $("#description").append(event[i].description);
            pullDate();
            $("#external-link").attr("href", event[i].url);

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

