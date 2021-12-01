//dynamic chart production bar
import Chart from 'chart.js/auto'
import "./ProductionBar.scss"
import React, { useEffect, useState, useRef } from 'react';

const chartConfig = {
  type: 'bar',
  data: {
      labels: [],   //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      datasets: []
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
};

// Here's the start of barchart compare
// Should generate a barchart for all avg kw production for that number of 
// months and year
const ProductionBar = (props) => {
  const {dataSets, axisLable }= props
  console.log('===-=-==-=-=-=--=-=-=-=-=-==') 

  console.log(props) 

  
  const chartContainer = useRef(null);
  const [state, setState] = useState(
    {
      graph: {},
    }

  );

  const setGraph = (graph) => {
    return setState(prev => {
      return ({ ...prev, graph })
    })
  }

  console.log('--------props.dataset',props.dataSets)
  chartConfig.data.datasets = []
  dataSets.forEach(e => chartConfig.data.datasets.push(e)  )
  

  chartConfig.data.labels = axisLable

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setGraph(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <row className="">
      <h2>{props.children}</h2>
      <div className='container'>
        <canvas ref={chartContainer} />
      </div>
    </row>
  );
};

export default ProductionBar;