import React from "react";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {BrowserRouter as Router, Route, useHistory} from 'react-router-dom'



const SideBar = props => {
   
const history = useHistory()
  return (
    <Router>
    <>
    <div className="sidebar">
      <Navigation
          
          onSelect={({itemId}) => {
            // push to the route  
           history.push(itemId)
           
          }}
          
          items={[
            {
              title: 'Solar Map',
              itemId: '/solarmap',
              
            },
            {
              title: 'My Sites',
              itemId: '/sites',
              
              subNav: [
                {
                  title: 'Add Site',
                  itemId: '/add_site',
                },
              
              ],
            },
            {
              title: 'Scoreboard',
              itemId: '/scoreboard',
              },
              ]}
        />
       </div>   
    </>
    </Router>
  );
};

export default SideBar