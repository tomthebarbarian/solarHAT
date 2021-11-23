import {React, Component} from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import Map from "./map";
import classNames from "classnames";
import './siteForm.css'
import axios from 'axios'


export default class SiteForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
    name: '',
    longitude: '',
    latitude: '',
    province: '',
    usage_kWh: ''
  }
  }
  
  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
    axios.post('/api/sites', this.state)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render(){
    const {name, longitude, latitude, usage_kWh}= this.state
  return (
    <Router>
    <>
    <h1>Add Site</h1>
    
    <form onSubmit={this.submitHandler}>
      <div>
        <input type='text' name='name' placeholder='Site name' value={name} onChange={this.changeHandler} />
      </div>
      <div>
        <input type='text' name='longitude' placeholder='longitude' value={longitude} onChange={this.changeHandler}/>
        <input type='text' name='latitude' placeholder='latitude' value={latitude} onChange={this.changeHandler}/>

      </div>
      {/* <div>
        <input type='text' name='size' placeholder='Panel Size' value={size} onChange={this.changeHandler}/>
      </div> */}
      <div>
        <input type='text' name='usage_kWh' placeholder='Consumption' value={usage_kWh} onChange={this.changeHandler}/>
      </div>
      <button type="submit">Submit</button>
      

    </form>
    
    <Map />
    </>
    </Router>
    
  )}
  }
