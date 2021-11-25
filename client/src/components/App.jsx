import './App.scss';
import './custom.scss';
import Map from './Map';
import { useState, useHooks, useEffect } from 'react';

// import {Container, Navbar, Button,  ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { Container, Navbar, Button, Nav, Row, Col, Modal, } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SideBar from './Sidebar';
import Form from './Form';
import Scoreboard from './Scoreboard';
import Analytics from './Analytics/Analytics';
import useAppData from './useAppData.js';

import Login from './Login/Login';
import Register from './Register/Register';

import classNames from 'classnames';
import EditSite from './Edit/EditSite.jsx';

export default function App() {
  //custom hook separate state logic from app rendering
  const {
    state,
    setState,
    loading,
    apiLogin,
    apiLogout,
    apiRegister,
    fnSetDay,
    bookInterview,
    deleteInterview,
    resetdB,
    fetchDays,
    fetchAppts,
  } = useAppData();

  //add condiontal styling
  const navbarClass = classNames('customNav');

  // const user = state.user;

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow((prev) => (prev = false));
  // const handleShow = () => {
  //   setShow((prev) => (prev = true));
  //   console.log('sign the fuk in', show);
  // };
  

  return (
    <Router>
      <>
        <head>
          <link
            rel='stylesheet'
            href='https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
            integrity='sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=='
            crossorigin=''
          />
          <link
            rel='stylesheet'
            href='http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css'
          />
          <link
            rel='stylesheet'
            href='http://leaflet.github.io/Leaflet.label/leaflet.label.css'
          />
        </head>

        <>
          <Navbar bg='dark' variant='dark' className={navbarClass}>
            <Container>
              <Navbar.Brand href='#'>solarFlares</Navbar.Brand>

              <Navbar.Toggle />

              <Navbar.Collapse className='justify-content-end'></Navbar.Collapse>
            
             {!state.user && <Register onClick={(user) => apiRegister(user)} state={state} setState={setState}/>}
              <Login onClick={(user) => apiLogin(user)} apiLogout={apiLogout} state={state} setState={setState}/>
              
            </Container>
          </Navbar>
        </>
        <main className='layout'>
          <section className='sidebar'>
            <SideBar />
          </section>

          <section>
            <Route path='/scoreboard' component={Scoreboard} />
            <Route path='/add_site' component={Form} />
          </section>

          {true && (
            <section className='analytics'>
              <Analytics />
            </section>
            )
          }

          <section>
            <EditSite/>
          </section>

          {false && (
            <section className='map'>
              <Map />
            </section>
           )
          }
        </main>
      </>
    </Router>
  );
}
