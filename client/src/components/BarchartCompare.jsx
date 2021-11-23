import Chart from 'chart.js/auto'
import "./BarchartCompare.scss"
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react';

const chartConfig = {
  type: 'bar',
  data: {
    // ...
  },
  options: {
    // ...
  }
};

const BarchartCompare = () => {
  const chartContainer = useRef(null);
  const [state, setState] = useState(
    {
      graph: {},
      monthdata: [],
    }
  );

  const setGraph = (graph) => {
    return setState(prev => {
      return ({ ...prev, graph })
    })
  }

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setGraph(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} id ='comparebar'/>
    </div>
  );
};

export default BarchartCompare;