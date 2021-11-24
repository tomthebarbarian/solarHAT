import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios'

import ProductionBar from './ProductionBar';
import SurplusProportion from './SurplusProportion';
import ProductionStats from './ProductionStats';
import { fetchData, apiCall, logout, login, register } from '../../helpers/api';


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
        "usage kWh 1000s":12.5,
        "size_kW":10.5}
    }
  );
  // 

  const monthData = state.monthData

  const setMonthData = (monthData) => {
    return setState(prev => {
      return ({ ...prev, monthData })
    })
  }

  useEffect(() => {
    //fetch data with API call
    fetchData()
      .then((data) => {
        setState((prev) => ({
          ...prev,
          sites: data.sites,
          model: data.model,
          users: data.users,
        }))
      }
    )
  }, [])

  const siteData = state.site
  const modelData = state.provinceModel

  // Data prep for the production graph
  const produceData = monthData.map(elem => elem * siteData.size_kW)

  // Surplus production, use covered by solar, not covered by solar
  // Surplus data format should be [surplus, deficit, covered]
  let totalProduce = 0
  produceData.forEach(each => {
    totalProduce += each
    }
  )

  const surplusData = [4,5,20]

  return (
    <div className='analytics'>
      <ProductionBar monthProduction= {produceData}/>
      <SurplusProportion surplusProduction={surplusData}/>
      <ProductionStats 
        site={siteData}
      />
    </div>
  );
}

