import React from "react";
import './ProductionEstimates.scss'

const ProductionEstimates = (props) => {
  const {totalproduction, surplus, utilization, netCost} = props
  return(
    <ul>
      <li>
        {`Annual(kWh): ${totalproduction}`}
      </li>
      <li>
        {`Surplus(kWh): ${surplus}`}
      </li>
      <li>
        {`Utilization (%): ${utilization}`}
      </li>
      <li>
        {`Energy Costs ($): ${netCost/100}`}
      </li>
    </ul>

  )
}
export default ProductionEstimates