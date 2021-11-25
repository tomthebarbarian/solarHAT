import './App.scss';
import './custom.scss';
import Map from './Map';
import { useState, useHooks, useEffect } from 'react';

import {Container, Navbar, FormControl,Form, Button, Nav, NavDropdown, ButtonGroup, Dropdown, DropdownButton, MenuItem } from 'react-bootstrap';
// import { Container, Navbar, Button,  Nav, Row, Col, Modal, } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SideBar from './Sidebar';
import AddForm from './AddForm';
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
  

 
  

   const provinceModel= {
        "pv_monthly_avg":[66,92,109,115,119,124,125,118,104,86,56,52],
        "cost_cents_avg":13
    }
    const site= {
      "_id":1,
      "name":"aj",
      "coord":[45.5462,-73.36564],
      "province":"ON",
      "usage_kWh":12.5,
      "size_kW":10.5}
  

      const [nav, setNav] = useState(1)
      let toggleMap 
      let toggleEditMap

  const showMap = () => {
    console.log('------------------------[showMap]---------------', nav)
    setNav(prev => ({...{}, showMap: true}))
    toggleMap = 'map'
    toggleEditMap = 'hide'
  }
  const editMap = () => {
    console.log('------------------------[editMap]---------------', nav)
    setNav(prev => ({...{}, editMap: true}))
    toggleMap = 'hide'
    toggleEditMap = 'map'
  }
  const analytics= () => {
    console.log('------------------------[analytics]---------------', nav)
    setNav(prev => ({...{}, analytics: true}))
  }
  const addSite  = () => {
    console.log('------------------------[addSite]---------------', nav)
    setNav(prev => ({...{}, addSite: true}))
  }
  const leaderBoard = () => {
    console.log('------------------------[leaderBoard]---------------', nav)
    setNav(prev => ({...{}, leaderBoard: true}))
  }

   //add condiontal styling
   //quick hack to resolve  more than one map issue
   const showMapclass = (classNames('',
    { 'map': nav.showMap },
     { '': nav.editMap }))

     const editMapClass = (classNames('',
     { '': nav.showMap },
     { 'map': nav.editMap }))


      console.log({showMapclass}, {editMapClass} )
  

  return (
      
      <>
        <head>
          <link rel='stylesheet' href='https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
            integrity='sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=='
            crossorigin=''/>
          <link rel='stylesheet'href='http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css'/>
          <link rel='stylesheet' href='http://leaflet.github.io/Leaflet.label/leaflet.label.css' />
        </head>

        <>
      

          <Navbar bg='dark' variant='dark' className={navbarClass}>
            <Container>
              <Navbar.Brand > <b>solar<i>Flares</i></b></Navbar.Brand>

              <Navbar.Toggle />
              <Navbar.Collapse className='justify-content-end'></Navbar.Collapse>

             {!state.user && <Register onClick={(user) => apiRegister(user)} state={state} setState={setState}/>}
              <Login onClick={(user) => apiLogin(user)} apiLogout={apiLogout} state={state} setState={setState}/>
              </Container>
          </Navbar>
        </>
       
        <main className='layout'>
          
          <section className='sidebar '>
       
            <ButtonGroup vertical>
              <Button variant="outline-secondary" onClick={() => showMap()} >Solar Map</Button>
              

              <DropdownButton variant="outline-secondary" as={ButtonGroup} title="mySolar" id="bg-vertical-dropdown-1">
              <Dropdown.Item variant="outline-secondary" eventKey="2" onClick={() => editMap()}>my Sites</Dropdown.Item>
              <Dropdown.Item variant="outline-secondary" eventKey="2" onClick={() => addSite()}>Add Site</Dropdown.Item>
              <Dropdown.Item variant="outline-secondary" eventKey="2" onClick={() => analytics()}>Analytics</Dropdown.Item>
              </DropdownButton>

              <Button variant="outline-secondary" onClick={() => leaderBoard()}>Leader Board</Button>
             </ButtonGroup>

          </section>

         
            <section className={showMapclass}>
                {(nav.showMap )&& <Map  state={state} setState={setState} />  }  
            
            </section>
          
               
          <section>
              {/* {nav.editMap && <EditSite />} */}
              {nav.analytics &&  <Analytics />}
              {nav.addSite &&  <EditSite/>}
              {nav.addSite &&  <AddForm/>}
              {nav.leaderBoard &&  <Scoreboard/>}
            </section>

            {(nav.editMap )&&
            <section className={editMapClass}>
             <EditSite/>
             <Map state={state} setState={setState}/>
            
            </section>
            }
        </main>
      </>
  );
}
