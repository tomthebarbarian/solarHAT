import './App.scss';
import './custom.scss';
import Map from './Map';
import { useState, useHooks, useEffect } from 'react';

import {Container, Navbar, Row, Col,  FormControl,Form, 
  Button, Nav, NavDropdown, ButtonGroup, Dropdown, 
  DropdownButton, MenuItem } from 'react-bootstrap';
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
import AddSite from './Add/AddSite';
import Landing from './Landing/Landing';
import { divIcon } from 'leaflet-css';

const SHOW = 0
const EDIT = 1
const ADD = 2
const ANALYTICS = 3
const DASH = 4

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

   
 
  const [nav, setNav] = useState({showMap:true})

  const navigate = (param) => {
    switch (param) {
      case SHOW:
        if (!nav.showMap) {
          setNav((prev) => ({ ...{}, showMap: true }));
        }
        break;
  
      case EDIT:
        if (!nav.mySites) {
          setNav((prev) => ({ ...{}, mySites: true }));
        }
        break;
  
      case ADD:
        if (!nav.addSite) {
          setNav((prev) => ({ ...{}, addSite: true }));
        }
        break;
  
      case ANALYTICS:
        if (!nav.analytics) {
          setNav((prev) => ({ ...{}, analytics: true }));
        }
        break;
  
      case DASH:
        if (!nav.leaderBoard) {
          setNav((prev) => ({ ...{}, leaderBoard: true }));
        }
        break;
  
      default:
        // setNav((prev) => ({ ...{}, landing: true }));
        setNav((prev) => ({ ...{}, showMap: true }));
    }
  
    console.log('-----------------[nav]---------------', nav);
  };
  


  const handleLogout = () => {
    console.log('-----------------[Appjsx user logout]---------------', nav)
    setNav(prev => ({...{}, showMap: true}))
    return apiLogout()
  }

   //add condiontal styling
   //quick hack to resolve  more than one map issue
   const showMapclass = (classNames('',
    { 'map': nav.showMap },
     { 'hide': nav.mySites }))

     const editMapClass = (classNames('',
     { 'hide': nav.showMap },
     { 'map': nav.mySites }))


  return (
      
    <>
         
        <Navbar bg='dark' variant='dark' className={navbarClass}>
          <Container>
            <Navbar.Brand ><b>solar<i>Flares</i></b></Navbar.Brand>

            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'></Navbar.Collapse>

            {!state.user && <Register apiRegister={apiRegister} state={state} setState={setState}/>}
            <Login apiLogin={apiLogin} apiLogout={handleLogout} state={state} setState={setState}/>
            </Container>
        </Navbar>
         
        {!state.logged && <Landing register={()=>console.log('aljflasfjaljfasljfaslfdj')} /> }  
     
      
      {state.logged && 
      
        <main className='layout'>


          <div className='sidebar '>
             <img className="logo--centered" src='./logo2.png' alt= 'logo' width='128'/>
            <br/>
            <ButtonGroup vertical>
              <Button variant="outline-secondary" onClick={() => navigate(SHOW)} >Solar Map</Button>
              
              <DropdownButton variant="outline-secondary" as={ButtonGroup} title="mySolar" id="bg-vertical-dropdown-1">
              <Dropdown.Item variant="outline-secondary" eventKey="2" onClick={() => navigate(EDIT)}> 
                 <img src='./editMap.png' alt= 'logo' width='32' />My Sites</Dropdown.Item>
              <Dropdown.Item variant="outline-secondary" eventKey="2" onClick={() => navigate(ADD)}>
                  <img src='./add.png' alt= 'logo' width='32' />Add Site</Dropdown.Item>
              <Dropdown.Item variant="outline-secondary" eventKey="2" onClick={() => navigate(ANALYTICS)}>
                 <img src='./analytics.png' alt= 'logo' width='32' />Analytics</Dropdown.Item>
              </DropdownButton>

               <Button variant="outline-secondary" onClick={() => navigate(DASH)}>Leader Board</Button>
             </ButtonGroup>

          </div> 
       
         { nav.showMap && 
          <div >
            <Map className='map' state={state} setState={setState} />  
          </div>  
          } 
        {nav.leaderBoard &&  <Scoreboard/>}
        <div>
          {
          (nav.analytics &&  state.userSites.length >=0 ) && 
          < Analytics  className='container' state={state} setState={setState} />
          }
            

          {nav.editMap &&
            <Col>
            <Row xs={6}>
                <EditSite state={state} setState={setState}/>
            </Row>
            <Row xs={6}>
                <Map state={state} setState={setState}/>          
            </Row>
          </Col>
          }

          {nav.addSite &&
             <Row>  
              
                <AddSite state={state} setState={setState}/>              
              
              
                <Map state={state} setState={setState}/>          
              
            </Row>
          }
         </div>
       
        {nav.mySites &&
          <div >  
            <EditSite className="container" state={state} setState={setState}/>              
                <p/>
            <div className='half-map'>
              <Map  state={state} setState={setState}/>          
            </div>
        </div>
        }
        

          {
            nav.addSite &&
             <div >  
                <AddSite className="" state={state} setState={setState}/>              
                  <p/>
               <div className='half-map'>
                <Map  state={state} setState={setState}/>          
               </div>
                 
           </div>
          }
          
        </main>
        
      }
    </>
  );
}
