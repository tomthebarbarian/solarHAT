import React from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import Map from "./map";
import classNames from "classnames";
import './siteForm.css'



function SiteForm() {
  return (
    <Router>
    <>
    <h1>Add Site</h1>
    
    <form>
      <div>
        <input type='text' name='name' placeholder='Site name' />
      </div>
      <div>
        <input type='text' name='longitude' placeholder='longitude' />
        <input type='text' name='latitude' placeholder='latitude' />
      </div>
      <div>
        <input type='text' name='size' placeholder='Panel Size' />
      </div>
      <input type='text' name='consumption' placeholder='Consumption' />
    </form>
    
    <Map />
    </>
    </Router>
    
  );
}

export default SiteForm