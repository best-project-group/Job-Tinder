// GOOGLE MAPS API KEY: AIzaSyCysKLNkJpvd4jHgJeSjfKlKfUSS5TvMXg

var config = {
  apiKey: "AIzaSyBsTvIy8q6B5Jc6Dc_fbGY9PYX_vRtz4a0",
  authDomain: "job-tinder-167a5.firebaseapp.com",
  databaseURL: "https://job-tinder-167a5.firebaseio.com",
  projectId: "job-tinder-167a5",
  storageBucket: "job-tinder-167a5.appspot.com",
  messagingSenderId: "66660247629"
};
firebase.initializeApp(config);

var googleKey = "key=AIzaSyCysKLNkJpvd4jHgJeSjfKlKfUSS5TvMXg"

var map, infoWindow, lat, long;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log("Lat and Long from google maps API:");
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      console.log("------------------------------------")

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
      getEvent();
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// Call the eventful API

var radius = 10
var eventfulKey = "app_key=d4dVMRcZjgzdC4mP";
var eventfulURL = "https://api.eventful.com/json/events/search?" + eventfulKey + "&location=" + lat + "," + long + "&within=" + radius
// var eventfulURL = "https://api.eventful.com/json/events/search?" + eventfulKey + "&location=44134"

getEvent().then(function (foundEvent) {

  // JQuery to go here!! 

  // console.log(foundEvent)
})

function getEvent() {
  return axios.get(eventfulURL)
    .then(function (axiosResponse) {
      // console.log(axiosResponse)
      console.log("Lat, Long, eventfulURL from within Axios call:")
      console.log(lat);
      console.log(long);
      console.log(eventfulURL)
      console.log("------------------------------------")
      var eventArray = []
      axiosResponse.data.events.event.forEach(function (singleEvent) {
        var event = {
          venueAddress: singleEvent.venue_address,
          venueName: singleEvent.venue_name,
          venueURL: singleEvent.venue_url,
          eventURL: singleEvent.url,
          eventCity: singleEvent.city_name,
          eventDescripition: singleEvent.descripition,
          startTime: singleEvent.start_time,
          stopTime: singleEvent.stop_time,
          eventTitle: singleEvent.title,
        }

        eventArray.push(event)
      })
      return (eventArray)
    })
}

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
    app_key: "wTFBTHnT7b7cPP6n",
    q: $("#search-term").val(),
    where: "cleveland",
    date: "2013061000-2019062000",
    include: "tags,categories",
    sort_order: "popularity",
  };

  /* SEARCHES THE API USING EVENTOBJECT */
  EVDB.API.call("/events/search", eventObject, function (objectData) {

    /* SIMPLIFIES LATER ENTRIES */
    event = objectData.events.event;

    /* LOOPS THROUGH THE RETRIEVED EVENT LIST */

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

    searchId = eventObject.q;
  });
}


$(document).ready(function () {

  searchId = "";

  i = 0;
  $("#submit-btn").on("click", function () {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $("#top-of-form").offset().top
    }, 5000);
    event.preventDefault();
    createCard();
    pullEvent();

    /* IF THE SEARCH TERM IS NEW, START CYCLE AT 0, ELSE ITERATE */
    if ($("#search-term").val() === searchId) {
      i++;
    }
    else {
      i = 0;
    }

    var zipCode = $("#zip-code").val().trim();
    console.log("zip code: " + zipCode);
    var count = 0;
    for (var i = 0; i < zipCode.length; i++) {
      count++
    }
    console.log(count);
    if (count !== 5) {
      var messg = $("<p>");

      messg.text("Please enter a 5-digit number"),
        $("#zip").append(messg);
    }
    else {
      messg.text();
    }
    var today = new Date();
    var inputDate1 = new Date($('#date1').val());
    var inputDate2 = new Date($('#date2').val());
    console.log("first date:  " + inputDate1);
    var dateMessg = $("<p>");
    if ((inputDate1.value == " ") || (inputDate2.value == "")) {
      dateMessg.text("Please select a valid date");
      $("#date").append(dateMessg);
    }
    else if ((inputDate1 < today) || (inputDate2 < today)) {
      dateMessg.text("Please start with today's date or a future date");
      $("#date").append(dateMessg);
    }
  });
});


