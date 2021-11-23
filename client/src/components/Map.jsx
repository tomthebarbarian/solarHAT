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
  const [state, setState] = useState(
    {
      map: {},
      sites: [],
    }
  )
  const setMap = (map) => {
    return setState(prev => {
      return ({ ...prev, map })
    })
  }
  
  const setSites = (sites) => {
    return setState(prev => {
      return ({ ...prev, sites })
    })
  }

  // const mapRef = React.useRef(null);
  useEffect(() => {
    Promise.all([
      axios.get('/api/sites')]
    ).then(res => {
      // console.log('this is axios sites', res[0].data)
      setSites(res[0].data)
    })

    setMap(
        L.map('map', 
        {
        center: [45.5017, -73.5673],
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

  },[])


  useEffect(()=> {
    const popup = L.popup()

    const onMapClick = (e) => {
      // console.log(e.latlng)
      popup
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at ${e.latlng}`)
        .openOn(state.map);
    }
  
    // console.log('This is state sites', state.sites)
    if (state.map.getRenderer) {
      
      L.marker([45.521020, -73.614750])
        .bindPopup('A marker').addTo(state.map)
      L.marker([45.489934, -73.566805])
        .bindPopup('Center Marker').addTo(state.map)
      state.map.on('click', onMapClick)
    }
    if (state.sites.length > 0) {
      for (let elem of state.sites){
        L.marker([elem.coord[0],
        elem.coord[1]]).bindPopup(elem.name).addTo(state.map)
      }
    }
  }, [state])

  return (
    <div id="map"
      style={{ height: "100%" }}
    >
    </div>
  )
}
export default Map

