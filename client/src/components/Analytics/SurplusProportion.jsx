//piechart
import Chart from 'chart.js/auto'
import "./SurplusProportion.scss"
import React, { useEffect, useState, useRef } from 'react';

const chartConfig = {
  type: 'doughnut',
  data: {
      labels: ['NET kWh', 'Consumption kWh', 'Production kWh'],
      datasets: [{
          label: 'production',
          data: [5, 5, 10],
          backgroundColor: [
              'rgba(255, 255, 200, 0.2)',
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


const SurplusProportion = (props) => {
  const {render, data} = props
  const chartContainer = useRef(null);
 
<<<<<<< HEAD

  const [graph, setGraph] = useState({
    graph: {},
  });

  console.log({render})


=======

  const [graph, setGraph] = useState({
    graph: {},
  });

  console.log({render})


>>>>>>> ddde9e2 (- add drop down for analytics to show site specific stats)
  console.log(data)
  chartConfig.data.datasets.data = []
  chartConfig.data.datasets.data.push(data)
  

  if (graph.data) {
    console.log(graph.data)
    // graph.data.datasets.forEach((dataset) => dataset.data.push(data))
    graph.update()
  }

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setGraph(newChartInstance);
    }
  }, [chartContainer]);


  
  if (graph.data && data.length > 0) {
      graph.data.datasets[0].data = []
      graph.data.datasets[0].data= data
      console.log('--------------------updates data--------------------')
       graph.update()
    }

  return (
    <div className='productionpie col-md-6'>
      <h2>Production Proportions</h2>
      <canvas ref={chartContainer} class ='productionpie'/>
    </div>
  );
};

export default SurplusProportion;