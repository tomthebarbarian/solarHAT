<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d70fbbf (adding scoreboard component with axios request to db)
import {React,  Component} from "react";
import axios from 'axios'
import className from 'classnames'
import './Scoreboard.css'
<<<<<<< HEAD
=======
// import {React, axios, useState, Component, useEffect} from "react";
// import {BrowserRouter as Router, Route} from 'react-router-dom'
>>>>>>> dc54507 (no real changes)
=======
>>>>>>> d70fbbf (adding scoreboard component with axios request to db)






<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d70fbbf (adding scoreboard component with axios request to db)
export default class Scoreboard extends Component{
  state = {
    siteData: []
  }
   
<<<<<<< HEAD
  

   siteInformation = function () {
   
    axios.get('/api/sites')
      .then((response) => {
        // console.log(response.data)
        this.setState({siteData: response.data })
        
      })
      .catch((err) => {
        console.log('Error while getting data', err)
      })
  }

  componentDidMount ()  {
    this.siteInformation()
  }
  
  render() {
  return (
    <>
    {console.log(this.state.siteData)}
    <table>
      {this.state.siteData.map((site) => {
        
   return( <tr>
      <td>{site.name}</td>
      <td>{site.province}</td>
      <td>{site.usage_kWh}</td>
    </tr>
   )
      })}
    
  </table>
    </>
  )}
  }
=======

// export default function Scoreboard(){
//   const [state, setState] = useState({}) 

  
=======
>>>>>>> d70fbbf (adding scoreboard component with axios request to db)
  

   siteInformation = function () {
   
    axios.get('/api/sites')
      .then((response) => {
        // console.log(response.data)
        this.setState({siteData: response.data })
        
      })
      .catch((err) => {
        console.log('Error while getting data', err)
      })
  }

  componentDidMount ()  {
    this.siteInformation()
  }
  
  render() {
  return (
    <>
    {console.log(this.state.siteData)}
    <table>
      {this.state.siteData.map((site) => {
        
   return( <tr>
      <td>{site.name}</td>
      <td>{site.province}</td>
      <td>{site.usage_kWh}</td>
    </tr>
   )
      })}
    
<<<<<<< HEAD
//     <table>
//     <tr>
//       <td>Centro comercial Moctezuma</td>
//       <td>Francisco Chang</td>
//       <td>Mexico</td>
//     </tr>
//   </table>
    
//   )
// }

>>>>>>> dc54507 (no real changes)
=======
  </table>
    </>
  )}
  }
>>>>>>> d70fbbf (adding scoreboard component with axios request to db)
