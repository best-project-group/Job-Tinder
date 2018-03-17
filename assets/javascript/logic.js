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

  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }



<script src="https://maps.googleapis.com/maps/api/js?key=" + apiKey +"&callback=initMap"
async defer>