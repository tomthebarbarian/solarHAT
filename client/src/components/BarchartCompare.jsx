import Chart from 'chart.js/auto'
import "./BarchartCompare.scss"
import axios from axios


import React, { useEffect, useRef } from 'react';
import Chartjs from 'chart.js';

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
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default BarchartCompare;