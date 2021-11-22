import React, {useState, useEffect } from "react";
import L from "leaflet"
// Need to find leaflet.css and import into webpack
// import "node_modules/leaflet/dist/leaflet.css"
// import "./leaflet.css"
import "./map.scss"
import axios from 'axios'
// import markerIconPng from "leaflet/dist/images/marker-icon.png"


const Map = (props) => {
  const [state, setState] = useState(
    {
      map: {}
    }
  )
  const setMap = (map) => {
    return setState(prev => {
      return ({ ...prev, map })
    })
  }
  // const marker = L.marker([45.521020, -73.614750])
  

  // const addMarker = (marker) => {
  //   if (state.map.layers) {
  //     marker.addTo(state.map)
  //   }
  // }

  // const mapRef = React.useRef(null);
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8080/api/sites'),
      axios.get('http://localhost:8080/api/model')]
    ).then(res => {
      console.log(res)
    })

    setMap(
        L.map('map', 
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
          // L.marker([45.521020, -73.614750])
          //   .bindPopup('A marker'),
          // L.marker([45.489934, -73.566805])
          //   .bindPopup('Center Marker')
        ]
        })
    )
    


    // // addMarker(marker)
    // L.layerGroup([
    //   L.marker([45.521020, -73.614750])
    //     .bindPopup('A marker'),
    //   L.marker([45.489934, -73.566805])
    //     .bindPopup('Center Marker')
    //   ])


    // const addLayer = () => {
    //   L.layerGroup.addTo(state.map)
    // }
    // const popup = L.popup()

    // const onMapClick = (e) => {
    //   popup
    //     .setLatLng(e.latlng)
    //     .setContent(`You clicked the map at ${e.latlng}`)
    //     .openOn(state.map);
    // }
  
    // if (state.map.layers){
    //   state.map.on('click', onMapClick)
    //   addMarker(L.marker([45.489934, -73.566805]).bindPopup('Center Marker'));
    // }
  },[])

  useEffect(()=> {
    console.log(state.map)
    if (state.map.getRenderer) {
      L.marker([45.521020, -73.614750])
        .bindPopup('A marker').addTo(state.map)
      L.marker([45.489934, -73.566805])
        .bindPopup('Center Marker').addTo(state.map)
    }
  }, [state.map])

  return (
    <div 
      id="map" 
    >
    </div>
  )
}
export default Map

