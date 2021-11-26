import React from 'react';
import { Button, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';
import { useState } from 'react';

import '../custom.scss';

import axios from 'axios';

import Geocode from 'react-geocode';
const DECIMALS =  6
Geocode.setApiKey('AIzaSyCcKsKVOs-uzI8Ri0xtVmP-Mi9NNsFkj_c');
Geocode.setLanguage('en');
Geocode.setRegion('ca');

export default function EditSite(props) {
  const { onClick, apiLogout, state, setState } = props;

  const [user, setUser] = useState({});
  const [code, setCode] = useState(false);

  const [mode, setMode] = useState(false);

  const [validated, setValidated] = useState(false);

  const [site, setSite] = useState({
    name: '',
    lat: '',
    long: '',
    usage_kWh: null,
    size_kW: null,
    province: '',
    address: '',
    zip: '',
  });

  const changeHandler = (e) => {
    setSite((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = () => {
    const newSite = { ...site };
    const coord = [Number(site.lat.toFixed(DECIMALS)), Number(site.long.toFixex(DECIMALS))];
    delete newSite.lat;
    delete newSite.long;
    newSite.coord = coord;
    setSite((prev) => ({ ...newSite }));

    const newSites = [...state.sites, newSite];

    setState((prev) => ({ ...prev, sites: newSites }));

    axios
      .post('/api/sites', newSite)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    clear();
  };

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

          if (Object.keys({...state.model[0]}).includes(e.short_name)) {
            province =  e.short_name
            break
          }

        }
            

        setSite( prev => ({...prev, lat, long, province}))
        console.log(site)

        // const province = res.results[0].address_components[4].short_name;
        // setState({ latitude: lat, longitude: lng, province: province });
        // console.log('state with correct coord', this.state);
      })
      .catch((error) => {
        console.log(error);
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

  const { name, lat, long, usage_kWh, size_kW, address, province, zip } = site;

  return (
    <main className='cols'>
      
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className=''
      >
        <Row className='mb-3'>
          <Form.Group as={Col} md='4' controlId='validationCustom01'>
            <Form.Label>Site Name</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Example Site'
              name={'name'}
              value={name}
              onChange={changeHandler}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='validationCustom02'>
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='-75.6554'
              onChange={changeHandler}
              name={'long'}
              value={long}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group as={Col} md='4' controlId='validationCustom02'>
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='45.5045'
              name={'lat'}
              value={lat}
              onChange={changeHandler}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            <img src='./geoicon.png' alt='logo' width='64px' height='64px' onClick={fetchLatLong}/>
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} md='4' controlId='validationCustom01'>
            <Form.Label>Average Annual Consumption [ kWh ]</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder=''
              name={'usage_kWh'}
              value={usage_kWh}
              onChange={changeHandler}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group as={Col} md='4' controlId='validationCustom02'>
            <Form.Label>PV System Size [ kW ]</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder=''
              name={'size_kW'}
              value={size_kW}
              onChange={changeHandler}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} md='6' controlId='validationCustom03'>
            <Form.Label>address</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Ottawa'
              name={'address'}
              value={address}
              onChange={changeHandler}
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md='3' controlId='validationCustom04'>
            <Form.Label>Province</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='ON'
              name={'province'}
              value={province}
              onChange={changeHandler}
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          {/* <Form.Group as={Col} md='3' controlId='validationCustom05'>
            <Form.Label>Zip</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='A0A 0Z0'
              name={'zip'}
              value={zip}
              onChange={changeHandler}
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group> */}
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
