import React from "react";
import './ProductionEstimates.scss'

const ProductionEstimates = (props) => {
  const {size , prod, usage, net, utilization, netCost} = props

  return(
    <ul className='col-md-6 text-center'>
      <h2>Production Estimates</h2>
      <li>
        {`System Size (kW): ${size}`}
      </li>
      <li>
        {`Annual Consumption (kWh): ${usage}`}
      </li>
       
      <li>
        {`Annual production (kWh): ${prod}`}
      </li>
      <li>
        {`NET (kWh): ${net}`}
      </li>
      <li>
        {`Utilization (%): ${Math.round(utilization * 10000)/100}`}
      </li>
      <li>
        {`Energy Costs ($): ${netCost}`}
      </li>
    </ul>

  )
}
export default ProductionEstimates