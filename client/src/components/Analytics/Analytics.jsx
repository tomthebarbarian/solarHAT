//dynamic anaylitcs 
import React, {useEffect, useState} from 'react';


import ProductionBar from './ProductionBar';
import SurplusProportion from './SurplusProportion';
import ProductionStats from './ProductionStats';
import ProductionEstimates from './ProductionEstimates';
import "./Analytics.scss"

import axios from 'axios'

export default function Analytics(props) {
  // Props should be named provinceModel, and sites
  const {state, setState} = props

 
  let provinceModel, monthData,produceData,
  totalProduction, totalUsage, netUsage, netCost,
  percentUsge, surplusData


  if (!state.userSites || !state.userSites.length) return (<div>NO DATA FOR USER SITES</div>)

  const siteInfo =  state.userSites[0]
          
  provinceModel = siteInfo.model  
  monthData = provinceModel.pv_monthly_avg

  // Prep for Production Estimates
    totalProduction = siteInfo.production

    totalUsage = siteInfo.usage_kWh 
    netUsage = (totalUsage - totalProduction)

  // 1.35 tax
    netCost = netUsage * provinceModel.cost_cents_avg

    percentUsge = totalProduction / totalUsage

  // Surplus production, use covered by solar, not covered by solar
  // Surplus data format should be [surplus, deficit, covered]
  // let surplusData = []
  surplusData = [0,0,totalProduction]
  if (netUsage > 0) {
    surplusData[0] = netUsage
  } else {
    surplusData[1] = netUsage
  }
  console.log('------ calculations ----------\n',
  {provinceModel}, {monthData},{produceData},
  {totalProduction}, {totalUsage}, {netUsage}, {netCost},
  {percentUsge}, {surplusData}) 

  
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
            console.log('--------------',elm)
            const prod_kWh =   elm * e.size_kW
            console.log(prod_kWh)
            return prod_kWh
          }),
          backgroundColor: [`rgba(${R}, ${G}, ${B}, 0.2)`],
          borderColor: [`rgba(${R}, ${G}, ${B}, 1)`],
          borderWidth: 1,
        };
        console.log(singleSite)
        console.log('------------------\n')
        return singleSite
    })
    
    console.log(dataSets)
    console.log('***********dataSets*************\n',dataSets)
    console.log('***********axisLable*************\n',axisLable)

  return (
    <div className='analytics'>
            <div className='topbar col-md-12 row'>
                  <ProductionEstimates
            totalproduction={totalProduction}
            surplus={totalProduction - totalUsage}
            utilization={percentUsge}
            netCost={netCost}
          />
          <SurplusProportion data={surplusData}/>
          <ProductionBar dataSets={dataSets} axisLable={axisLable}  />
        </div>
       </div>
  );
}

