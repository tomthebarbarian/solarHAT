import React from "react";
import './ProductionStats.scss'

const ProductionStats = (props) => {
  return(
    <ul>
      <li>
        {`Province ${props.province}`}
      </li>
      <li>
        {`Name: ${props.name}`}
      </li>
      <li>
        {`Usage (kWH): ${props.usage}`}
      </li>
      <li>
        {`Size (kWH): ${props.size}`}
      </li>
    </ul>

  )
}
export default ProductionStats