"use strict";

// ini buat di script html
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 37.033287,
      lng: -95.61945
    },
    zoom: 20
  });
}


