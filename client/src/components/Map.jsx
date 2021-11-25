import React, {useState, useEffect } from "react";
import L from "leaflet"
// Need to find leaflet.css and import into webpack
// import "node_modules/leaflet/dist/leaflet.css"
// import "./leaflet.css"
import "./map.scss"
import axios from 'axios'
// import markerIconPng from "leaflet/dist/images/marker-icon.png"
//  import  'leaflet'

 import 'leaflet-css'

//  import {  } from 'leaflet-css'

const Map = (props) => {

  const {state, setState} = props
  /*
    map: {_addLayers: ƒ _addLayers() {}, _addZoomLimit: ƒ _a…}
    model: [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
    sites: [{…}, {…}, {…}, {…}, {…}]
    user:null
    users:[{…}, {…}, {…}, {…}]
*/

  const [map, setMap] = useState({} )


  
  // const mapRef = React.useRef(null);
  useEffect(() => {
    console.log('----------[this is props.sites]--------', state.sites)
    setMap(
        L.map('map', 
        {
        center: [50.5017, -100.5673],
        zoom: 5,
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
        ]
        })
    )
  },[state.sites])


  useEffect(()=> {
    const popup = L.popup()

    const onMapClick = (e) => {
      // console.log(e.latlng)
      popup
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at ${e.latlng}`)
        .openOn(map);
    }
  
    // console.log('This is state sites', state.sites)
    if (map.getRenderer) {
      console.log('.............rendering markers..................')
      
      L.marker([45.521020, -73.614750])
        .bindPopup('A marker').addTo(map)
      L.marker([45.489934, -73.566805])
        .bindPopup('Center Marker').addTo(map)
      map.on('click', onMapClick)
  
      if (state.sites.length > 0) {
        for (let elem of state.sites){
          L.marker([elem.coord[0],
          elem.coord[1]]).bindPopup(elem.name).addTo(map)
        }
      }
    }
  
  }, [map])

  return (
    <>
    <div id="map"
    >
      Map should be here
    </div>
    </>
  )
}
export default Map

