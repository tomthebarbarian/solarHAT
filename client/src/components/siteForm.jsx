import React from "react";
<<<<<<< HEAD
import {BrowserRouter as Router} from 'react-router-dom'
import Map from "./map";
import classNames from "classnames";
import './siteForm.css'
=======
import {BrowserRouter as Router, Route} from 'react-router-dom'
>>>>>>> dc54507 (no real changes)



function SiteForm() {
  return (
    <Router>
    <>
    <h1>Add Site</h1>
<<<<<<< HEAD
    
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
=======
    <form>
      <input type='text' name='name' placeholder='Site name' />
      <input type='text' name='longitude' placeholder='longitude' />
      <input type='text' name='latitude' placeholder='latitude' />
      <input type='text' name='province' placeholder='Province' />
      <input type='text' name='consumption' placeholder='Consumption' />
    </form>
>>>>>>> dc54507 (no real changes)
    </>
    </Router>
    
  );
}

export default SiteForm