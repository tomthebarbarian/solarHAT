import Chart from 'chart.js/auto'
import "./ProductionBar.scss"
import React, { useEffect, useState, useRef } from 'react';

const chartConfig = {
  type: 'bar',
  data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      datasets: [{
          label: '# kWH produced',
          data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
      }]
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

  chartConfig.data.datasets[0].data = props.monthProduction

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setGraph(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} class ='comparebar'/>
    </div>
  );
};

export default ProductionBar;