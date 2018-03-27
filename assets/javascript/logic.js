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
    center: {
      lat: -34.397,
      lng: 150.644
    },
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

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);

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


function testEvent(lat, long) {}

function dateCheck(inputDate1, inputDate2) {
  var today = moment().format("YYYYMMDD");
  // var inputDate1 = $('#date1').val();
  // var inputDate2 = $('#date2').val();
  // console.log("today: " + today);
  console.log("first date:  " + inputDate1);
  console.log("second date:  " + inputDate2);
  console.log(today);

  var dateMessg = $("<p>");
  if ((inputDate1.value == " ") || (inputDate2.value == "")) {
    dateMessg.text("Please select a valid date");
    $("#date").append(dateMessg);
  } else if ((inputDate1 < today) || (inputDate2 < today)) {
    dateMessg.text("Please start with today's date or a future date");
    $("#date").append(dateMessg);
  }
}

// Call the eventful API



var radius, zipCode, searchTerm, firstDate, secondDate;

function getEvent(lat, long) {
  var eventfulKey = "app_key=d4dVMRcZjgzdC4mP";
  radius = $("#rad").val().trim();
  zipCode = $("#zip-code").val().trim();
  searchTerm = $("#search-term").val().trim();
  var category = $("#category").val().trim();
  firstDate = moment($("#date1").val().trim()).format("YYYYMMDD");
  secondDate = moment($("#date2").val().trim()).format("YYYYMMDD");
  if (zipCode.length === 5)
    var latLong = zipCode
  else var latLong = lat + "," + long
  dateCheck(firstDate, secondDate);
  var URL = "https://api.eventful.com/json/events/search?" + eventfulKey + "&within=" + radius + "&location=" + latLong + "&q=" + searchTerm + "&c=" + category + "&date=" + firstDate + "00-" + secondDate + "00"
  return axios.get(URL)
    .then(function (axiosResponse) {
      console.log(URL)
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
    
     searchID = $("#search-term").val().trim();
     categoryID = $("#category").val().trim();
     $("#event").append(eventArray[i].eventTitle);
     $("#venue").append(eventArray[i].venueName);
     $("#description").append(eventArray[i].eventDescripition);
     $("#external-link").attr("href", eventArray[i].eventURL);


      function pullDate() {

          startTime = moment(new Date(eventArray[0].startTime));
          timeToDoors = moment().to(startTime)
          formattedStart = moment(startTime).format("LLLL");

          $("#description").append(formattedStart + "<br>" + timeToDoors)

      }
     pullDate();
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

var i = 0;

var searchID = "";
var categoryID = "";

$("#submit-btn").on("click", function(event) {
  event.preventDefault();

    $('html, body').animate({
      scrollTop: $("#top-of-form").offset().top
    }, 5000);


    /* IF THE SEARCH TERM IS NEW, START CYCLE AT 0, ELSE ITERATE */
    if($("#search-term").val().trim() === searchID && $("#category").val().trim() === categoryID) {
      i++;
    }
    else {
      i = 0;
    }
    

    createCard();
    getEvent(lat, long);


  var zipCode = $("#zip-code").val().trim();
  console.log("zip code: " + zipCode);


});




}