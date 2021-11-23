import Chart from 'chart.js/auto'
import "./SurplusProportion.scss"
import React, { useEffect, useState, useRef } from 'react';

const chartConfig = {
  type: 'pie',
  data: {
      labels: ['Surplus', 'Deficit', 'Covered'],
      datasets: [{
          label: 'surplus production',
          data: [5, 5, 5],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 132, 99, 0.2)',
              'rgba(99, 255, 132, 0.2)'
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
const SurplusProportion = (props) => {
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

  // chartConfig.data.datasets[0].data = props.surplusProduction

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setGraph(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} class ='productionpie'/>
    </div>
  );
};

export default SurplusProportion;