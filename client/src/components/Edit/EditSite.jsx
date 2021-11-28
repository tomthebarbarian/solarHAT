import { React, useState, useEffect } from 'react';
import axios from 'axios';
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
  const [singleSite, setSingleSite] = useState({});
  const [site, setSite] = useState([]);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const lat = singleSite.coord?.length > 1 ? singleSite.coord[1] : undefined;
  const long = singleSite.coord?.length > 1 ? singleSite.coord[0] : undefined;

  const editHandle = (editSite) => {
    setSingleSite(editSite);
    console.log('edit site', editSite);
    setShow(EDIT);
  };

  const delHandle = (editSite) => {
    setSingleSite(editSite);
    console.log('delete site', editSite);
    setShow(EDIT);
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    console.log(state);
    console.log('state user id', state.user._id);
    axios
      .get(`/api/sites/${state.user._id}`)
      .then((response) => {
        console.log(response.data);
        setSite(response.data);
      })
      .catch((err) => {
        console.log('Error while getting data', err);
      });
  }, []);

  const submit = () => {
    const coord = [singleSite.lat, singleSite.long];
    delete singleSite.lat;
    delete singleSite.long;
    singleSite.coord = coord;
    // setSingleSite((prev) => ({ ...singleSite }));

    axios
      .post(`/api/sites/edit/${singleSite._id}`, singleSite)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  const changeHandler = (e) => {
    setSingleSite((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log('single site', singleSite);
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

  function getLocation() {
    console.log('button clicked');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  function showPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    setSingleSite((prev) => ({ ...prev, lat, long }));
  }

  const fetchLatLong = () => {
    console.log('-----------------------');
    console.log(site.address);
    Geocode.fromAddress(site.address)
      .then((res) => {
        console.log(res.results[0]);
        const lat = res.results[0].geometry.location.lat.toFixed(DECIMALS);
        const long = res.results[0].geometry.location.lng.toFixed(DECIMALS);
        const addrComp = res.results[0].address_components;

        let province = '';
        for (const e of addrComp) {
          if (Object.keys({ ...state.model[0] }).includes(e.short_name)) {
            province = e.short_name;
            break;
          }
        }
        console.log({ province });
        setSingleSite((prev) => ({ ...prev, lat, long, province }));
        setState((prev) => ({ ...prev, marker: { lat: lat, lng: long } }));
        console.log(site);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      {console.log('SITE', site)}

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
          {site.map((s) => {
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
                  <td>
                    <Button
                      variant='outline-danger'
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Site</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className='mb-3'>
              <Form.Group as={Col} md='6' controlId='validationCustom01'>
                <Form.Label>Site Name</Form.Label>

                <Form.Control
                  required
                  type='text'
                  placeholder='Example Site'
                  name='name'
                  value={singleSite.name}
                  onChange={changeHandler}
                />
                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group
                as={Col}
                md='1'
                className='icon'
                controlId='validationCustom02'
              >
                <div id='demo'>
                  <button>
                    <img
                      src='./geoicon.png'
                      alt='logo'
                      height='32'
                      onClick={() => getLocation()}
                      title='Get current location [Lat, Long]'
                    />
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
                  name='lat'
                  value={lat}
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
                  name='long'
                  value={long}
                />
              </Form.Group>
              {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            </Row>

            <Row className='mb-3'>
              <Form.Group as={Col} md='6' controlId='validationCustom01'>
                <Form.Label>Avg. Consumption [ kWh / Yr ]</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder=''
                  name='usage_kWh'
                  value={singleSite.usage_kWh}
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
                  name='size_kW'
                  value={singleSite.size_kW}
                  onChange={changeHandler}
                />
                {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} md='1' controlId='validationCustom03'>
                <Form.Label>Get</Form.Label>

                <button>
                  <img
                    src='./geo.png'
                    alt='logo'
                    height='32'
                    onClick={fetchLatLong}
                  />
                </button>
              </Form.Group>

              <Form.Group as={Col} md='6' controlId='validationCustom03'>
                <Form.Label>address</Form.Label>
                <Form.Control
                  required
                  type='text'
                  placeholder='Ottawa'
                  name='address'
                  value={singleSite.address}
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
                  name='province'
                  value={singleSite.province}
                  onChange={changeHandler}
                />

                <Form.Control.Feedback type='invalid'>
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button
              type='submit'
              variant='outline-success'
              onClick={handleClose}
            >
              Submit
            </Button>
            <span> </span>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
