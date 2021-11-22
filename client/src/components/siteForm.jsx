import React from "react";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 978abec (adding site form component to file with map integration)
import {BrowserRouter as Router} from 'react-router-dom'
import Map from "./map";
import classNames from "classnames";
import './siteForm.css'
<<<<<<< HEAD
=======
import {BrowserRouter as Router, Route} from 'react-router-dom'
>>>>>>> dc54507 (no real changes)
=======
>>>>>>> 978abec (adding site form component to file with map integration)



function SiteForm() {
  return (
    <Router>
    <>
    <h1>Add Site</h1>
<<<<<<< HEAD
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
=======
    
>>>>>>> 978abec (adding site form component to file with map integration)
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
<<<<<<< HEAD
>>>>>>> dc54507 (no real changes)
=======
    
    <Map />
>>>>>>> 978abec (adding site form component to file with map integration)
    </>
    </Router>
    
  );
}

export default SiteForm