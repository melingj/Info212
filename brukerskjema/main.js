var lat;
var lng;
var fullAdresse;
var adresse;
var postSted;
var land;

function initMap() {
  // Instillinger for kartet.
  var options = {
    zoom: 14,
    fullscreenControl: false,
    zoomControl: false,
    mapTypeControl: false,
    center: {
      lat: 60.3913,
      lng: 5.3221
    },

  }

  // Nytt kart
  var map = new google.maps.Map(document.getElementById('map'), options);

  // Legger til ny marker når man klikker på 
  google.maps.event.addListener(map, 'click', function(event) {
    // Add marker
    addMarker({
      coords: event.latLng
    });
    //Skriver til konsole verdi for Longitude and Lattitude
    lat = event.latLng.lat();
    lng = event.latLng.lng();


    console.log("lat " + lat + ", " + "Long " + lng);

    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'latLng': latlng
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          fullAdresse = results[1].formatted_address.split(",");
          adresse = fullAdresse[0];
          postSted = fullAdresse[1];
          land = fullAdresse[2];
          console.log("Location: " + results[1].formatted_address);
          console.log(fullAdresse);
          console.log(adresse);
          console.log(postSted);
          console.log(land);

        }
      }
    });

  });

  // Funksjonen som legger til en marker på kartet
  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      icon: props.iconImage
    });
  }
}


//Alt som har med databasen å gjøre herfra og ned

var config = {
  apiKey: "AIzaSyCsuhPqcNdCD2N-9knmOZRpaZCM8GRdu7o",
  authDomain: "brukerinnhold.firebaseapp.com",
  databaseURL: "https://brukerinnhold.firebaseio.com",
  projectId: "brukerinnhold",
  storageBucket: "brukerinnhold.appspot.com",
  messagingSenderId: "214215603752"
};

firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('ny_lokasjon');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  var navn = getInputVal('navn');
  var belysning = getInputVal('belysning');
  var type = getInputVal('type');
  var beskrivelse = getInputVal('beskrivelse');


  // Save message
  saveMessage(navn, belysning, type, beskrivelse, land, adresse, postSted, lat, lng);

  // Show alert
  //document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  /*setTimeout(function() {
      document.querySelector('.alert').style.display = 'none';
  }, 3000); */

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(navn, belysning, type, beskrivelse, land, adresse, postSted, lat, lng) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    navn: navn,
    belysning: belysning,
    type: type,
    beskrivelse: beskrivelse,
    land: land,
    adresse: adresse,
    postSted: postSted,
    lat: lat,
    lng: lng

  });
}