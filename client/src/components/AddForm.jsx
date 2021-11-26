import {React, Component} from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import classNames from "classnames";
import Geocode from 'react-geocode'
import { fetchData } from "../helpers/api";

import axios from 'axios'
// import './Form.scss'

Geocode.setApiKey('AIzaSyCcKsKVOs-uzI8Ri0xtVmP-Mi9NNsFkj_c');
Geocode.setLanguage('en');
Geocode.setRegion('ca');


export default class AddForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
    name: '',
    longitude: null,
    latitude: null,
    province: '',
    usage_kWh: '',
    size: '',
    province: '',
    address: ''
  }
  }
  
  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    // console.log(this.state)
    Geocode.fromAddress(this.state.address)
        .then((response) => {
          console.log(response)
          const lat = response.results[0].geometry.location.lat
          const lng = response.results[0].geometry.location.lng
          const province = response.results[0].formatted_address.split(',')[2].split(' ')[1]
        
          this.setState({latitude: lat, longitude: lng, province: province})
          console.log("state with correct coord",this.state)
          axios.post('/api/sites', this.state)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
        },
        (error)=>{
          console.log(error)
        })
    
  }

  render(){
    const {name, address , size, usage_kWh}= this.state
  return (
   
    <>
    <section className="site-form">
    
    <form onSubmit={this.submitHandler}>
      <div className='input'>
        <label id='name'>Site Name: </label>
        <input type='text' name='name' placeholder='Site name' value={name} onChange={this.changeHandler} />
      </div>
      <div className='input'>
        <label className='add'>Address: </label>
        <input id='add' type='text' name='address' placeholder='Address' value={address} onChange={this.changeHandler}/>
      </div>
      <div className='input'>
      <label id='size'>Size: </label>
        <input type='text' name='size' placeholder='Panel Size' value={size} onChange={this.changeHandler}/>
      </div>
      <div className='input'>
      <label id='consumption'>Consumption: </label>
        <input type='text' name='usage_kWh' placeholder='Consumption' value={usage_kWh} onChange={this.changeHandler}/>
      </div>
      <button type="submit">Submit</button>
    </form>
    </section>
   
    </>
    
    
  )}
  }