import React from 'react';
import { Button, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';
import { useState } from 'react';

import '../custom.scss';

import axios from 'axios';
import {constants} from '../../helpers/constants'

import Geocode from 'react-geocode';
const DECIMALS =  6
Geocode.setApiKey('AIzaSyCcKsKVOs-uzI8Ri0xtVmP-Mi9NNsFkj_c');
Geocode.setLanguage('en');
Geocode.setRegion('ca');

export default function AddSite(props) {
  const { onClick, apiLogout, state, setState } = props;

  const [user, setUser] = useState({});
  const [code, setCode] = useState(false);

  const [mode, setMode] = useState(false);

  const [validated, setValidated] = useState(false);

  const [site, setSite] = useState({
    name: '',
    lat: '',
    long: '',
    usage_kWh: '',
    size_kW: '',
    province: '',
    address: '',
    // zip: '',
  });


  // const [dummy , setDummy] = useState()


  const changeHandler = (e) => {
    setSite((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = () => {
    const newSite = { ...site };
    const coord = [Number(site.lat), Number(site.long)];
    delete newSite.lat;
    delete newSite.long;
    newSite.coord = coord;
    setSite((prev) => ({ ...newSite }));

    const newSites = [...state.sites, newSite];

    setState((prev) => ({ ...prev, sites: newSites }));

    axios
      .post('/api/sites/new/', newSite)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

      setState(prev => ({...prev, count: state.count++}))
    clear();
  };



const x = document.getElementById("demo");

function getLocation() {
  console.log('button clicked')
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  
const lat = position.coords.latitude
const long =  position.coords.longitude
  setSite( prev => ({...prev, lat, long}))
 
}


  const fetchLatLong = () => {
    console.log('-----------------------')
    console.log(site.address)
    
    Geocode.fromAddress(site.address)
      .then((res) => {
        console.log(res.results[0]);
        const lat = res.results[0].geometry.location.lat.toFixed(DECIMALS);
        const long = res.results[0].geometry.location.lng.toFixed(DECIMALS);
        const addrComp = res.results[0].address_components
        
        
        let province = ''
        for (const e of addrComp) {

          if (constants.prov.includes(e.short_name)) {
            province =  e.short_name
            break
          }

        }
        console.log({province})
        setSite( prev => ({...prev, lat, long, province}))
        setState(prev => ({...prev, markers:{ [site._id] : {lat: lat, lng: long}}}))
        
        
        // setDummy(state.map.L.marker([state.marker.lat,state.marker.lng]))
        // state.map.addLayer(dummy)




        console.log(site)
        // const province = res.results[0].address_components[4].short_name;
        // setState({ latitude: lat, longitude: lng, province: province });
        // console.log('state with correct coord', this.state);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const clear = () => {
    // setValidated(false)
    setSite((prev) => ({
      ...{},
      name: '',
      lat: '',
      long: '',
      usage_kWh: '',
      size_kW: '',
      province: '',
      address: '',
      zip: '',
    }));

    setValidated((prev) => false);

    // state.map.removeLayer(dummy)
  };
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated((prev) => true);

    if (form.checkValidity()) {
      submit();
      setValidated((prev) => false);
    }
  };

  const { name, lat, long, usage_kWh, size_kW, address, province} = site;

  return (
    <main className='half container'>
      <h1> Add Site</h1>         
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className=''
      >
        <Row className='mb-3'>
          <Form.Group as={Col} md='5' controlId='validationCustom01'>
            <Form.Label>Site Name</Form.Label>  
            
            <Form.Control
              required
              type='text'
              placeholder=''
              name='name'
              value={name}
              onChange={changeHandler}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>

         
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} md='2' controlId='validationCustom02'>
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder=''
              name='lat'
              value={lat}
              onChange={changeHandler}
            />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}

          </Form.Group>
            <Form.Group as={Col} md='2' controlId='validationCustom02'>
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder=''
              onChange={changeHandler}
              name='long'
              value={long}
            />
          </Form.Group> 
          <Form.Group as={Col} md='1' className='icon' controlId='validationCustom02'>
            <div id = "demo" >
            <button > 
              <img src='./geoicon.png' alt='logo' height='32' onClick={() => getLocation()} title="Geolocation [Lat, Long]"/>
             </button>
            </div> 
          
            </Form.Group>
        
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
           
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} md='3' controlId='validationCustom01'>
            <Form.Label>Avg. Consumption [ kWh / Yr ]</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder=''
              name='usage_kWh'
              value={usage_kWh}
              onChange={changeHandler}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md='3' controlId='validationCustom02'>
            <Form.Label>PV System Size [ kW ]</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder=''
              name='size_kW'
              value={size_kW}
              onChange={changeHandler}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>         
        </Row>
        <Row className='mb-3'>
       
         <Form.Group as={Col} md='3' controlId='validationCustom03'>
            <Form.Label>address</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder=''
              name='address'
              value={address}
              onChange={changeHandler}
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='2' controlId='validationCustom04'>
            <Form.Label>Province</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder=''
              name='province'
              value={province}
              onChange={changeHandler}
            />

        
             
            <Form.Control.Feedback type='invalid'>
              Please provide a valid state.
            </Form.Control.Feedback>
            
          </Form.Group>
          <Form.Group as={Col} md='3' controlId='validationCustom05'>
           
            <Form.Group as={Col} md='1' controlId='validationCustom03'>
              <Form.Label >Get</Form.Label>

                <button > 
                    <img src='./geo.png' alt='logo' height='32' onClick={fetchLatLong}  title="Get address coordinates [Lat, Long]"/>
                </button>
            </Form.Group>
       
          
           </Form.Group>
        </Row>
        <Button type='submit' variant='outline-success'>
          Submit
        </Button>
        <span> </span>
        <Button type='button' variant='outline-dark' onClick={clear}>
          Clear
        </Button>
      </Form>
    </main>
  );
}
