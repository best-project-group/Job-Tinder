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
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
      postalCodeGet(lat, long)
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

function postalCodeGet(lat, long) {
  var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&" + googleKey
  $.ajax({
    url: googleURL,
    method: "GET"
    }).then(function(response) {
    console.log(response);
    });
  };

// Reverse Search Format
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCysKLNkJpvd4jHgJeSjfKlKfUSS5TvMXg

