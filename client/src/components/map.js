import React, {useState, useEffect } from "react";
import L from "leaflet"



 const Map = (props) => {
  const [state, setState] = useState(
    {
      map: '',
      marker:[]
    }
  )
  const setMap = (map) => {
    return setState(prev => {
      return ({ ...prev, map })
    })
  }

  const setMarker = (marker) => {
    return setState(prev => {
      return ({ ...prev, marker })
    })
  }

   useEffect(() => {
     setMap(L.map('map', {
      center: [51.505, -0.09],
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
        )
      ]
    }))
   },[])
  // const mymap = L.map('map').setView([51.505, -0.09], 13);

  // L.tileLayer(
  //   'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', 
  //   {
  //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //     maxZoom: 18,
  //     id: 'mapbox/streets-v11',
  //     tileSize: 512,
  //     zoomOffset: -1,
  //     accessToken: 'pk.eyJ1IjoidG9tdGhlYmFyYmFyaWFuIiwiYSI6ImNqZmZ4Z2ZvczJhaXgzM3BheHR3Nml2OGYifQ.jq0Tt-4aD5EpAaQ8ihykLw'
  //   }
  // ).addTo(mymap);
  
  // const marker = L.marker([51.5, -0.09]).addTo(mymap);
  // marker.bindPopup(
  //   `
  //   <b>Hello world!</b>
  //   <br>I am a popup.
  //   `
  // ).openPopup();
  
  // const popup = L.popup();
  
  // const onMapClick = (e) => {
  //   popup
  //     .setLatLng(e.latlng)
  //     .setContent(`You clicked the map at ${e.latlng}`)
  //     .openOn(mymap);
  // }
  
  // mymap.on('click', onMapClick)

  return (
  <div 
    id="map" 
    style={{height: "180px"}}
  >
  </div>
  )
}
export default Map

