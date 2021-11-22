import React, {useState, useEffect } from "react";
import L from "leaflet"
// Need to find leaflet.css and import into webpack
// import "node_modules/leaflet/dist/leaflet.css"
// import "./leaflet.css"
import "./map.scss"
// import markerIconPng from "leaflet/dist/images/marker-icon.png"

const myIcon = L.icon({
  iconUrl: 'leaflet/dist/images/marker-icon.png'
});

const Map = (props) => {
  const [state, setState] = useState(
    {
      map: ''
    }
  )
  const setMap = (map) => {
    return setState(prev => {
      return ({ ...prev, map })
    })
  }
  const marker = L.marker([45.521020, -73.614750])
  

  const addMarker = (marker) => {
    if (state.map !== '') {
      marker.addTo(state.map)
    }
  }
  const mapRef = React.useRef(null);
  useEffect(() => {
    mapRef.current = L.map('map', 
      {
      center: [45.489934, -73.566805],
      zoom: 13,
      layers: [ 
        L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', 
          {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoidG9tdGhlYmFyYmFyaWFuIiwiYSI6ImNqZmZ4Z2ZvczJhaXgzM3BheHR3Nml2OGYifQ.jq0Tt-4aD5EpAaQ8ihykLw'
          }
        ),
        L.marker([45.521020, -73.614750],
                    ).bindPopup('A marker'),
      ]
      })
    


    // addMarker(marker)

    if (state.map) {
      marker.addTo(state.map)
    }

    const addLayer = () => {
      L.layerGroup.addTo(state.map)
    }



    const onMapClick = (e) => {
      L.popup
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at ${e.latlng}`)
        .openOn(state.map);
    }
    
    if (state.map != ''){
      state.map.on('click', onMapClick)
    }

  },[])

  const markerRef = React.useRef(null);
  React.useEffect(
    () => {
      if (markerRef.current) {
        markerRef.current.setLatLng([45.489934, -73.566805]);
      } else {
        markerRef.current = L.marker([45.489934, -73.566805]).bindPopup('Center Marker').addTo(mapRef.current);
      }
    },
    []
  );

  return (
    <div 
      id="map" 
    >
    </div>
  )
}
export default Map

