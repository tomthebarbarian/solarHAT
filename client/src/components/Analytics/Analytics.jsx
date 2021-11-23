import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'

import ProductionBar from './ProductionBar';
import SurplusProportion from './SurplusProportion';


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

  // Data fetching for the future
    // Promise.all([
  //   axios.get('/api/sites')]
  // )
  const monthData = state.monthData

  const setMonthData = (monthData) => {
    return setState(prev => {
      return ({ ...prev, monthData })
    })
  }

  const siteData = state.site

  // Data prep for the production graph
  const produceData = monthData.map(elem => elem * siteData.size_kW)

  // Surplus production, use covered by solar, not covered by solar
  const surplusData = [4,5,20]

  return (
    <div className='analytics'>
      <ProductionBar monthProduction= {produceData}/>
      <SurplusProportion surplusProduction={surplusData}/>
    </div>
  );
}

