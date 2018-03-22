// initalize firebase

  var config = {
      apiKey: "AIzaSyBsTvIy8q6B5Jc6Dc_fbGY9PYX_vRtz4a0",
      authDomain: "job-tinder-167a5.firebaseapp.com",
      databaseURL: "https://job-tinder-167a5.firebaseio.com",
      projectId: "job-tinder-167a5",
      storageBucket: "job-tinder-167a5.appspot.com",
      messagingSenderId: "66660247629"
    };
    firebase.initializeApp(config);

// call google maps API    

var googleKey = "key=AIzaSyCysKLNkJpvd4jHgJeSjfKlKfUSS5TvMXg"

var map, infoWindow, lat, long;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
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
    }, function() {
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

getEvent().then(function(foundEvent) {
 
  // JQuery to go here!! 

  // console.log(foundEvent)
})

function getEvent() {  
return axios.get(eventfulURL)
  .then(function(axiosResponse) {
    // console.log(axiosResponse)
    console.log("Lat, Long, eventfulURL from within Axios call:")
    console.log(lat);
    console.log(long);
    console.log(eventfulURL)
    console.log("------------------------------------")
    var eventArray = []
     axiosResponse.data.events.event.forEach(function(singleEvent) { 
      var event= {
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
  return(eventArray)
  })
}
