import React from "react";
import './ProductionEstimates.scss'

const ProductionEstimates = (props) => {
  const {totalproduction, surplus, utilization} = props
  return(
    <ul>
      <li>
        {`Annual: ${totalproduction}kWh`}
      </li>
      <li>
        {`Surplus: ${surplus}`}
      </li>
      <li>
        {`Utilization (%): ${utilization}`}
      </li>
      <li>
        {`Energy Costs: ${'To be determined'}`}
      </li>
    </ul>

  )
}
export default ProductionEstimates