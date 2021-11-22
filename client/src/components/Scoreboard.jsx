import {React,  Component} from "react";
import axios from 'axios'
import className from 'classnames'
import './Scoreboard.css'






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
