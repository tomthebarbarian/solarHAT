import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import ProductionBar from './ProductionBar';
import SurplusProportion from './SurplusProportion';
import ProductionStats from './ProductionStats';
import ProductionEstimates from './ProductionEstimates';

export default function Analytics(props) {
  const [state, setState] = useState(
    {
      provinceModel: {
          "pv_monthly_avg":[66,92,109,115,119,124,125,118,104,86,56,52],
          "cost_cents_avg":13
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
  
  // State getters and setters
  const siteData = {...state.site}
  const setSite = (site) => {
    return setState(prev => ({...prev, site}))
  }
  

  const provinceModel = {...state.provinceModel}

  const setProvinceModel = (provinceModel) => {
    return setState(prev => {
      return ({ ...prev, provinceModel })
    })
  }

  useEffect( () => {
    setProvinceModel(props.provinceModel)
    setSite(props.site)
  },[])

  const monthData = provinceModel.pv_monthly_avg

  // Data prep for the production graph
  const produceData = monthData.map(elem => elem * siteData.size_kW)

  // Prep for Production Estimates
  let totalProduction = 0
  produceData.forEach(each => {
    totalProduction += each
    }
  )

  const totalUsage = siteData.usage_kWh * 1000
  const netUsage = (totalUsage - totalProduction)
  
  // 1.35 tax
  const netCost = netUsage * provinceModel.cost_cents_avg
  
  const percentUsge = totalProduction / totalUsage

  // Surplus production, use covered by solar, not covered by solar
  // Surplus data format should be [surplus, deficit, covered]
  // let surplusData = []
  const surplusData = [0,0,totalProduction]
  if (netUsage > 0) {
    surplusData[0] = netUsage
  } else {
    surplusData[1] = netUsage
  }

  return (
    <div className='analytics'>
        <ProductionStats 
          site={siteData}
        />
       <div>
          <ProductionEstimates
            totalproduction={totalProduction}
            surplus={totalProduction - totalUsage}
            utilization={percentUsge}
            netCost={netCost}
          />
          <SurplusProportion surplusProduction={surplusData}/>
      </div>
      <ProductionBar monthProduction= {produceData}/>
    </div>
  );
}

