import { React, useState, useEffect } from 'react';
import axios from 'axios';
import {constants} from '../../helpers/constants'

import className from 'classnames';
import '../Scoreboard.css';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import Geocode from 'react-geocode';
const DECIMALS = 6;
Geocode.setApiKey('AIzaSyCcKsKVOs-uzI8Ri0xtVmP-Mi9NNsFkj_c');
Geocode.setLanguage('en');
Geocode.setRegion('ca');

//const EDIT = 1
const EDIT = 1;
const DELETE = 2;

export default function EdiSite(props) {
  const { state, setState } = props;
  const [userSites, setUserSites] = useState([]);
  const [currentSite, setCurrentSite] = useState({});
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  
  const editHandle = (targetSite) => {
    const site = {...targetSite}
    site.lat = site.coord[0]
    site.long = site.coord[1]
    delete site.coord
    setCurrentSite(prev => ({...{}, ...site}));
  
    setShow(EDIT);
  };


  const delConfirm = () => {
    axios
      .post(`/api/sites/delete/${currentSite._id}`)
      .then((res) => {
        console.log(res.data)
        handleClose()
      })
      .catch((error) => {
        console.log(error);
      });
      setShow(prev => prev = false) 
      setState(prev => ({...prev, count: prev.count--})) 
  };

  const delHandle = (targetSite) => {
    setCurrentSite(targetSite);
    console.log('delete site', targetSite);
    setShow(DELETE);

    
  };

  const handleClose = () => setShow(prev=> prev = false);

  useEffect(() => {
    console.log(state);
    console.log('state user id', state.user._id);
    axios
      .get(`/api/u/sites/${state.user._id}`)
      .then((response) => {
        console.log(response.data);
        setUserSites(response.data);
      })
      .catch((err) => {
        console.log('Error while getting data', err);
      });
  }, [show]);

  const submit = () => {
    const updatedSite = { ...currentSite };
    const coord = [currentSite.lat, currentSite.long];
    delete updatedSite.lat;
    delete updatedSite.long;
    updatedSite.coord = coord;
    
    const newSites = [...state.sites, updatedSite];

    setState((prev) => ({ ...prev, sites: newSites }));

    axios
      .post(`/api/sites/edit/${updatedSite._id}`, updatedSite)
      .then((res) => {
        console.log(res.data)
        handleClose()
      })
      .catch((error) => {
        console.log(error);
      });


  };
  
  const changeHandler = (e) => {
    setCurrentSite((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function getLocation() {
    console.log('button clicked');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  
  function showPosition(position) {
  
    const lat = position.coords.latitude
    const long =  position.coords.longitude
      setCurrentSite( prev => ({...prev, lat, long}))
     
    }

  const fetchLatLong = () => {
    console.log('-----------------------')
    console.log(currentSite.address)
    Geocode.fromAddress(currentSite.address)
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
        setCurrentSite( prev => ({...prev, lat, long, province}))
        setState(prev => ({...prev, markers:{ [currentSite._id] : {lat: lat, lng: long}}}))
        console.log(currentSite)
      })
      .catch((error) => {
        console.log(error.message);
      });
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

  
  const { name, lat, long, usage_kWh, size_kW, address, province} = currentSite;
  
  return (
    <>
       <table class='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Consumption</th>
            <th scope='col'>Production</th>
            <th scope='col'>Cost</th>
          </tr>
        </thead>
        <tbody>
          {userSites.map((s) => {
            
            return (
              <>
                <tr>
                  <th scope='row'>{}</th>
                  <td>{s.name}</td>
                  <td>{s.usage_kWh}</td>
                  <td>{s.production}</td>
                  <td>{s.cost}</td>
                  <td>
                    <Button
                      variant='outline-primary'
                      onClick={() => editHandle(s)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td><Button variant='outline-danger'
                      onClick={() => delHandle(s)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>

      <Modal show={show===EDIT} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Site</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1> Add Site</h1>         
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className=''
          >
            <Row className='mb-3'>
              <Form.Group as={Col} md='6' controlId='validationCustom01'>
                <Form.Label>Site Name</Form.Label>  
                
                <Form.Control
                  required
                  type='text'
                  placeholder='Example Site'
                  name={'name'}
                  value={name}
                  onChange={changeHandler}
                />
              </Form.Group>

              <Form.Group as={Col} md='1' className='icon' controlId='validationCustom02'>
                <div id = "demo" >
                <button > 
                  <img src='./geoicon.png' alt='logo' height='32' onClick={() => getLocation()} title="Get current location [Lat, Long]"/>
                </button>
                </div> 
              
                </Form.Group>
            
            </Row>
            <Row className='mb-3'>
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
              </Form.Group> 
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col} md='6' controlId='validationCustom01'>
                <Form.Label>Avg. Consumption [ kWh / Yr ]</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder=''
                  name={'usage_kWh'}
                  value={usage_kWh}
                  onChange={changeHandler}
                />
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
              </Form.Group>         
            </Row>
          
            <Row className='mb-3'>
            <Form.Group as={Col} md='1' controlId='validationCustom03'>
            <Form.Label>Get</Form.Label>
              <button > 
                  <img src='./geo.png' alt='logo' height='32' onClick={fetchLatLong}/>
              </button>
              </Form.Group>
          
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
            </Row>
            <Button type='submit' variant='outline-success'>
              Submit
            </Button>
            <span> </span>
           </Form>
        </Modal.Body>
      </Modal>

      <Modal show={show===DELETE} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Site</Modal.Title>
        </Modal.Header>
        <Modal.Body>     
          <Form>
          <Form.Label>Are you sure you want to delete <b> {currentSite.name} </b>?</Form.Label>

          <Row className='mb-2'>
              <Form.Group as={Row} md='12' controlId='validationCustom01'>
                <Button type='button' variant='outline-danger' onClick={()=> delConfirm()} >
                  Confirm
                </Button>
                <pre> </pre>
                <Button type='button' variant='outline-success' onClick={()=>handleClose()}>
                  Cancel
                </Button>
              </Form.Group>         
            </Row>
           </Form>  
        </Modal.Body>
      </Modal>
      
    </>
  );
}



