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

   

  const [nav, setNav] = useState({})
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


  return (
      
      <>
       

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

      {state.user && 
          <section className='sidebar '>
             <img className="logo--centered" src='./logo2.png' alt= 'logo' width='128'/>
            
            <ButtonGroup vertical>
              <Button variant="outline-secondary" onClick={() => showMap()} >Solar Map</Button>
              
              <DropdownButton variant="outline-secondary" as={ButtonGroup} title="mySolar" id="bg-vertical-dropdown-1">
              <Dropdown.Item variant="outline-secondary" eventKey="2" onClick={() => editMap()}> 
              <img src='./editMap.png' alt= 'logo' width='32' />my Sites</Dropdown.Item>
              <Dropdown.Item variant="outline-secondary" eventKey="2" onClick={() => addSite()}>
              <img src='./add.png' alt= 'logo' width='32' />add Sites</Dropdown.Item>
              <Dropdown.Item variant="outline-secondary" eventKey="2" onClick={() => analytics()}>
              <img src='./analytics.png' alt= 'logo' width='32' />Analytics</Dropdown.Item>
              </DropdownButton>

               <Button variant="outline-secondary" onClick={() => leaderBoard()}>Leader Board</Button>
             </ButtonGroup>

          </section> 
          }

          {/* {(!state.user )&&
            <section className="map">   
              
              <Map state={state} setState={setState}/>
              
            </section>
            }
              
         
          */}
            <section className={`cols ${showMapclass}`} >
           
                {(nav.showMap   ) && <Map  state={state} setState={setState} />  }  
            
            </section>
               
          <section >
              {nav.analytics &&  <Analytics state={state} setState={setState} />}
              {nav.leaderBoard &&  <Scoreboard/>}
            </section>

          {(nav.addSite )&&
               <section className="cols">
                 <EditSite state={state} setState={setState}/>              
              </section>
              }

            {(nav.editMap )&&
            <section className={`cols ${editMapClass}`}>
              <div className="container"> 
               <h1> My Sites</h1>
                  <EditSite state={state} setState={setState}/>
              </div>
              <Map state={state} setState={setState}/>          
            </section>
            }
        </main>
      </>
  );
}
