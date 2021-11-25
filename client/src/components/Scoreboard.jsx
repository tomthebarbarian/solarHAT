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
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Ranking</th>
      <th scope="col">Name</th>
      <th scope="col">Usage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    </tbody>
    </table>  
    </>
  )}
  }
