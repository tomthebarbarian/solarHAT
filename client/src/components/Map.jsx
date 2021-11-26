import React, {useState, useEffect } from "react";
import L from "leaflet"
// Need to find leaflet.css and import into webpack
// import "node_modules/leaflet/dist/leaflet.css"
import 'leaflet-css'
import "./map.scss"
import axios from 'axios'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
//  import  'leaflet'


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

  const [map, setMap] = useState({})



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
  }, [state.sites])


  const myIcon = L.icon({
    iconUrl: './redmarker.png',
    iconSize: [32, 32],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],

  });

  useEffect(() => {
    const popup = L.popup()

    const onMapClick = (e) => {
      // console.log(e.latlng)
      popup
        .setLatLng(e.latlng)

      const ll = popup.getLatLng(e.latlng);
      console.log(ll)
      // Create url to use for getting the data
      const tempUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${ll.lat}&lon=${ll.lng}&appid=f47e3b80d1c5930eef8a0bb433094f47`
      const pvUrl = `/pv_data`

      // Fetch the data with the created url
      // axios.post('/login', {
      //   email: user.email,
      //   password: user.password
      // })  <link rel='stylesheet' href='http://leaflet.github.io/Leaflet.label/leaflet.label.css' />

      let tooltip = ''
      Promise.all([
        axios.get(tempUrl),
        axios.post(pvUrl, {...ll})
      ])
        .then(res => {
          const data = {
            weather: res[0].data,
            pvout: res[1].data,
          }
          console.log('--------[fetch data]---------\n', data);
          return data;
        })
        .then(data => {
          // Use response data to update the popup's content
         console.log('------------------',data)
         let i =0
         for (const key in data.pvout ) {
         
          const keys = ['ELE' ,'PVOUT_csi', 'GHI', 'DNI' ,'GTI_opta' ,'OPTA' ,'TEMP']
          const units = ['m', 'kWh/kWp','W/m²', 'W/m²','W/m²','°','°C']
            if (keys.includes(key)){  
                tooltip = tooltip + `<br> <b> ${key} </b>: ${data.pvout[key].toFixed(2)} ${units[i]}` 
                i++
            }
            
         }
          popup
            .setContent(
              `<b> [Lat, Long] </b>: [${data.weather.coord.lat} ${data.weather.coord.lon}] 
             ${tooltip}
                `)
            .openOn(map);
          ;
        })
    }

    if (map.getRenderer) {
      console.log('.............rendering markers..................')

      L.marker([45.521020, -73.614750])
        .bindPopup('A marker').addTo(map)
      L.marker([45.489934, -73.566805])
        .bindPopup('Center Marker').addTo(map)
      map.on('click', onMapClick)

      if (state.sites.length > 0) {
        for (let elem of state.sites) {
          L.marker([elem.coord[0],elem.coord[1]],
             { icon: myIcon }).bindPopup(elem.name)
             .addTo(map)
        }
      }
    }

  }, [map])

  return (
    <>
      <div id="map">
        Map should be here
      </div>
    </>
  )}

  export default Map