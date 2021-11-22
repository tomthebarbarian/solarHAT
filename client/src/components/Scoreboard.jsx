<<<<<<< HEAD
import {React,  Component} from "react";
import axios from 'axios'
import className from 'classnames'
import './Scoreboard.css'
=======
// import {React, axios, useState, Component, useEffect} from "react";
// import {BrowserRouter as Router, Route} from 'react-router-dom'
>>>>>>> dc54507 (no real changes)






<<<<<<< HEAD
export default class Scoreboard extends Component{
  state = {
    siteData: []
  }
   
  

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

  
  

//   const scoresByHighestOrder = function () {
//     Promise
//     .all([
//     axios.get('/api/sites')])
//       .then((response) => {
//         console.log(response[0].data)
//         // this.setState(response.data)
//       })
//       .catch((err) => {
//         console.log('Error while getting data', err)
//       })
//   }
//   useEffect(scoresByHighestOrder)
  
//   return (
    
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
