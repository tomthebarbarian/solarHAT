
import './App.scss';
import Map from './Map'
import {useState, useHooks, useEffect} from 'react'

// import {Container, Navbar, Button,  ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SideBar from './Sidebar'
import Form from './Form'
import Scoreboard from './Scoreboard';
import BarchartCompare from './BarchartCompare';



export default function App() {
  
  return (
    

    <Router>
      <>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"crossorigin></script>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css" />
        <link rel="stylesheet" href="http://leaflet.github.io/Leaflet.label/leaflet.label.css" />
        <link rel="stylesheet" href="style.css" />
        <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
      </head>
      <main className="layout">      
        <section className="sidebar">
          <SideBar />        
        </section>
        
        <div >    
          <section >
            <Route path="/scoreboard" component={Scoreboard} />
            <Route path="/add_site"   component={Form} />
          </section>         
        </div> 
        
        <BarchartCompare/>
        <section className="map">
          <Map />
        </section>
      </main>
      </>
    </Router>  
  );
}
