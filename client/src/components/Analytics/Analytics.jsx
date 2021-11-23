import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'

import ProductionBar from './ProductionBar';




export default function Analytics(props) {
  const [state, setState] = useState(
    {
      monthData: [36,79,134,148,129,125,117,105,82,51,35,24],
      provinceModel: {
        "_id":"619bd8f50e7e193e9fd00d0e",
        "ON":{
          "pv_monthly_avg":[66,92,109,115,119,124,125,118,104,86,56,52],
          "cost_cents_avg":13}
      },
      site: {
        "_id":1,
        "name":"aj",
        "coord":[45.5462,-73.36564],
        "province":"ON",
        "usage_kWh":12.5,
        "size_kW":10.5}
    }
  );
  
  const monthData = state.monthData

  const setMonthData = (data) => {
    
  }

  const siteData = state.site

  const producedata = monthData.map(elem => elem * siteData.size_kW)

  // Promise.all([
  //   axios.get('/api/sites')]
  // )

  return (
    <>
      <ProductionBar monthProduction= {producedata}/>
    </>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
