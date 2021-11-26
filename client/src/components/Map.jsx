import React, {useState, useEffect } from "react";
import L from "leaflet"
// Need to find leaflet.css and import into webpack
// import "node_modules/leaflet/dist/leaflet.css"
import 'leaflet-css'
import "./map.scss"
import axios from 'axios'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
//  import  'leaflet'



const Map = (props) => {

  const {state, setState} = props

  const [map, setMap] = useState({})

  // const mapRef = React.useRef(null);
  useEffect(() => {
    console.log('----------[this is props]--------', props)
    console.log('----------[this is props.sites]--------', state)
    setMap(
      L.map('map',
        {
          center: [50.5 || state.marker.lat, -100.5 || state.marker.lng],
          zoom: 5 || state.marker.zoom,
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
<<<<<<< HEAD
  }, [])


  const myIcon = L.icon({
    iconUrl: './redmarker.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, 0],
=======
  },[state])
>>>>>>> 81f0418 (trying to fix map)

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

      
      // let dummy =   L.marker([state.marker.lat,state.marker.lng])
      //   .bindPopup('add site')
        
      //   map.addLayer(dummy)
      //   map.removelayer(dummy)

      map.on('click', onMapClick)

      if (state.sites.length > 0) {
        for (let elem of state.sites) {
          L.marker([elem.coord[0],elem.coord[1]],
             { icon: myIcon }).bindPopup(elem.name)
             .addTo(map)
        }
      }
    }

  }, [map,myIcon, state])

  return (
    <>
      <div id="map">
        Map should be here
      </div>
    </>
  )}

  export default Map