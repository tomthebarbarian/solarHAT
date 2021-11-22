
import './App.scss';
import Map from './map'

// import {Container, Navbar, Button,  ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap'


function App() {
  return (
    <>
      {/* <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
      </head> */}

      <main className="layout">
        <section className="sidebar">
          navbar wtf
        </section>

        <section className="map">

          <Map />

        </section>

      </main>

    </>
  );
}

export default App;
