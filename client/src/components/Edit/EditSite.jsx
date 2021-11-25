import React from 'react';
import { Button, Modal, Form, Row, Col, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';
import { useState } from 'react';

import '../custom.scss';

import axios from 'axios';

export default function EditSite(props) {
  const { onClick, apiLogout, state, setState } = props;

  const [user, setUser] = useState({});
  const [code, setCode] = useState(false);

  const [show, setShow] = useState(false);

  const [validated, setValidated] = useState(false);

  const [site, setSite] = useState({
    name: '',
    lat: '',
    long: '',
    usage_kWh: 0,
    size_kW: 0,
    province: '',
    city: '',
    zip: '',
  });

  const changeHandler = (e) => {
    setSite((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return
    }

    setValidated(true);

    const newSite = { ...site };
    const coord = [site.lat, site.long];
    delete newSite.lat;
    delete newSite.long;
    newSite.coord = coord;
    setSite((prev) => ({ ...newSite }));

    axios
      .post('/api/sites', newSite)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { name, lat, long, usage_kWh, size_kW, city, province, zip } = site;

  return (
    <main className='cols'>
      <div></div>
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
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Form.Group as={Col} md='4' controlId='validationCustom01'>
            <Form.Label>Average Annual Consumption [ kWh ]</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='10000'
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
              placeholder='8.6'
              name={'size_kW'}
              value={size_kW}
              onChange={changeHandler}
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} md='6' controlId='validationCustom03'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Ottawa'
              name={'city'}
              value={city}
              onChange={changeHandler}
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid city.
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
          <Form.Group as={Col} md='3' controlId='validationCustom05'>
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='A0A 0Z0'
              name={'zip'}
              value={zip}
              onChange={changeHandler}
            />
            <Form.Control.Feedback type='invalid'>
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type='submit' variant='outline-success'>
          Submit form
        </Button>
      </Form>
    </main>
  );
}
