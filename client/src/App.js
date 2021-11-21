import './App.css';
import Map from './components/map'
import SideBar from './components/Sidebar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'



function App() {
  return (
    <Router>
    <>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
      <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"crossorigin></script>
    </head>
    <main className="App">
      <SideBar />
      <Route path="/solarmap" component={Map} />
    </main>
    </>
    </Router>
    
  );
}

export default App;
