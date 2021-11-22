
import './App.scss';
import Map from './Map'
import {useState, useHooks, useEffect} from 'react'

// import {Container, Navbar, Button,  ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap'


function App() {
  
  const [state,setState] = useState([])
  
  // useEffect = () => {
  //   setState(prev => ({...prev, 
  //   dayList:['solar map', 'my site', 'add site', 'leader board'] ,
  //   day: 'solar map',
  //   onChange: 'fnSetDay',
  //   loading: true,
  
  // }))
  // }
  
  //SideNav child component properties required
  const sideNavProps = {
    dayList: state.days,
    day: state.day,
    onChange: 'fnSetDay',
    loading: true,
  };

  return (
    <>
      
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css" />
    <link rel="stylesheet" href="http://leaflet.github.io/Leaflet.label/leaflet.label.css" />
    <link rel="stylesheet" href="style.css" />
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>



      <main className="layout">
        <section className="sidebar">
              
          <section className="sidebar">
          <button>solar map</button>
          <button>my solar</button>
          <button>add site</button>
          <button>leader board</button>
          {/* <SideNav {...sideNavProps} /> */}
        </section>

        </section>

        <section className="map">

          <Map />

        </section>

      </main>

    </>
  );
}

export default App;
