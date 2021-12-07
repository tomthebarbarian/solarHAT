//dynamic anaylitcs 
import React, {useEffect, useState} from 'react';


import ProductionBar from './ProductionBar';
import SurplusProportion from './SurplusProportion';
import ProductionStats from './ProductionStats';
import ProductionEstimates from './ProductionEstimates';
import { DropdownButton, ButtonGroup, Dropdown, Button, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import "./Analytics.scss"

import axios from 'axios'

const Empty = (props) => {
    console.log(props)
  return (
    <div class="text">
      <h2> {props.title} </h2>
      <h3> {props.subtitle} </h3>
      <br/>
      <h5> {props.content} </h5>
    </div>
  );
};

export default function Analytics(props) {
  // Props should be named provinceModel, and sites
  const {state, setState} = props

  const [index, setIndex] = useState(0)
  const [siteInfo,setSiteInfo] = useState({})


  const changeHandler =(e) => {
    setIndex(prev => e.target.name)
    // setState(prev => ({...prev , toggle:1^index}))
    console.log(index) 

  }

 
  useEffect(()=>{

    if (!state.userSites || !state.userSites.length) return  <Empty subtitle="No site data found!" content="Please add a site first" />
  
  },[])
  
  

  useEffect (()=>{

    setSiteInfo (prev =>( {...state.userSites[index]}))
  },[state.userSites,index])


 
  if (!state.userSites || !state.userSites.length) return  <Empty subtitle="No site data found!" content="Please add a site first" />
  
  const chartData = [siteInfo.net, siteInfo.usage_kWh, siteInfo.production]
  
     console.log('-----on load --------->:',state.userSites)
    
    const axisLable = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    const dataSets = state.userSites.map(e => {
      const   R = Math.floor(Math.random()*255)
      const   G = Math.floor(Math.random()*255)
      const   B = Math.floor(Math.random()*255)
      
      const singleSite =
        {
          type:'bar',
          label: e.name,
          data: e.model.pv_monthly_avg.map((elm) => {
            const prod_kWh =   elm * e.size_kW
            // console.log(prod_kWh)
            return prod_kWh
          }),
          backgroundColor: [`rgba(${R}, ${G}, ${B}, 0.2)`],
          borderColor: [`rgba(${R}, ${G}, ${B}, 1)`],
          borderWidth: 1,
        };
        // console.log(singleSite)
        // console.log('------------------\n')
        return singleSite
    })

  

 
  return (


    <div className='container-fluid'>
      <div className='row'>      
        <ProductionEstimates
            size={siteInfo.size}
            prod={siteInfo.prod}
            usage={siteInfo.usage }
            net={siteInfo.net}
            utilization={siteInfo.production / siteInfo.usage_kWh }
            netCost={ siteInfo.cost}
        /> 
        <SurplusProportion data={chartData} render={index}/>

        <div className='container'>
           <DropdownButton as={ButtonGroup} variant="secondary" title="Select Site..." id="bg-vertical-dropdown-1">
              {state.userSites.map((e,index) => {
                 return  (
                    <Dropdown.Item name={index} value={e.name} onClick={changeHandler}>            
                    [{index}] {e.name}
                    </Dropdown.Item>
                    )
                 })}
            </DropdownButton>
        </div>
      </div>

    <div className='sidebar__separator'/>
      <ProductionBar dataSets={dataSets} axisLable={axisLable}  />
    </div>
  );
}

