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
    {/* {console.log(this.state.siteData)} */}
    <table className='scoreboard'>
     
   <tr>
      {this.state.siteData.map((site) => <td>{site.name}</td>)}
    </tr>
    <tr>
      {this.state.siteData.map((site) => <td>{site.usage_kWh}</td>)}
    </tr>
    
    
    
  </table>
    </>
  )}
  }
