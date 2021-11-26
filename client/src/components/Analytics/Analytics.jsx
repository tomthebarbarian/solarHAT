import React, {useEffect, useState} from 'react';


import ProductionBar from './ProductionBar';
import SurplusProportion from './SurplusProportion';
import ProductionStats from './ProductionStats';
import ProductionEstimates from './ProductionEstimates';
import "./Analytics.scss"


export default function Analytics(props) {
  // Props should be named provinceModel, and sites
  const {state, setState} = props

  
  const modelx = {...state.model[0]}

  const siteData = state.sites[3]
  const provinceModel = modelx[siteData.province]

  const monthData = provinceModel.pv_monthly_avg

  // Data prep for the production graph
  const produceData = monthData.map(elem => elem * siteData.size_kW)

  // Prep for Production Estimates
  let totalProduction = 0
  produceData.forEach(each => {
    totalProduction += each
    }
  )

  const totalUsage = siteData.usage_kWh 
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
      <div className='topbar col-md-12 row'>
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

