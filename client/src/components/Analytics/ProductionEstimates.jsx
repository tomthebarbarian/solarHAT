import React from "react";
import './ProductionEstimates.scss'

const ProductionEstimates = (props) => {
  const {totalproduction, surplus, utilization, netCost} = props
  return(
    <ul>
      <h2>Production Estimates</h2>
      <li>
        {`Annual production (kWh): ${totalproduction}`}
      </li>
      <li>
        {`Surplus(kWh): ${surplus}`}
      </li>
      <li>
        {`Utilization (%): ${Math.round(utilization * 100)/100}`}
      </li>
      <li>
        {`Energy Costs ($): ${netCost/100}`}
      </li>
    </ul>

  )
}
export default ProductionEstimates