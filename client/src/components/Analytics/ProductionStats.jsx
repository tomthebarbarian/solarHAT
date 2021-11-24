import React from "react";
import './ProductionStats.scss'

const ProductionStats = (props) => {
  const {province, name, usage_kWh, size_kW} = props.site
  return(
    <ul className="productionstats">
      <li>
        {`Province ${province}`}
      </li>
      <li>
        {`Name: ${name}`}
      </li>
      <li>
        {`Usage (kWH): ${usage_kWh}`}
      </li>
      <li>
        {`Size (kW): ${size_kW}`}
      </li>
    </ul>

  )
}
export default ProductionStats