import { Component, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';

import Chart from 'chart.js/auto';
import '../components/Analytics/Analytics.scss';
import './Scoreboard.css';



const chartConfig = {
  data: {
    labels: [],
    datasets: []
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

export default function Scoreboard(props) {
  const [state, setState] = useState({
    data: [],
    option: 'name',

  });

  const [graph, setGraph] = useState({
    graph: {},
  });

  const siteInfo = function (option) {
    axios
      .get(`/api/sites/s/${option}`)
      .then((response) => {
        // console.log(response.data)
        setState((prev) => ({ ...prev, data: response.data }));  
        // console.log(state)
      })
      .catch((err) => {
        console.log('Error while getting data', err);
      });
  };
  

  useEffect(() => {
    siteInfo(state.option);
  }, [state.option]);

  const changeHandler = (e) => {
    console.log('-------e.target.name--------', e.target.name);
    setState((prev) => ({ ...prev, option: e.target.name }));

    siteInfo(e.target.name);
  };

  const chartContainer = useRef(null);

    
  // useEffect(() => {
  //   if (chartContainer && chartContainer.current) {
  //     const newChartInstance = new Chart(chartContainer.current, chartConfig);
  //     setGraph(newChartInstance);
  //   }
  // }, [chartContainer, chartConfig]);

  useEffect(() => {
    
    const size_kW = {
      type: 'bar',
      label: 'System Size [kW]',
      data: state.data.map((e) => e.size_kW),
      backgroundColor: ['rgba(3, 41, 97, 0.2)'],
      borderColor: ['rgba(3, 41, 97, 1)'],
      borderWidth: 1,
    };

    const production = {
      type:'bar',
      label: 'Production [kWh]',
      data: state.data.map((e) => e.production),
      backgroundColor: ['rgba(99, 255, 120, 0.2)'],
      borderColor: ['rgba(99, 255, 120, 1)'],
      borderWidth: 1,
    };

    const usage_kWh = {
      type:'bar',
      label: 'Consumption [kWh]',
      data: state.data.map((e) => e.usage_kWh),
      backgroundColor: ['rgba(133, 99, 255, 0.2)'],
      borderColor: ['rgba(133, 99, 255, 1)'],
      borderWidth: 1,
    };
    const net = {
      type: 'bar',
      label: 'NET [kWh]',
      data: state.data.map((e) => e.net),
      backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(255,99, 132,1'],
      borderWidth: 1,
    };



    const data = []
    data.push(size_kW,production,usage_kWh,net)
    
    const axisLabel = state.data.map((e) => e.name)
    chartConfig.data.datasets = data
    chartConfig.data.labels= axisLabel
    
    if (graph.data) {
      console.log(graph.data)
      graph.data.labels.push(axisLabel)
      // graph.data.datasets.forEach((dataset) => dataset.data.push(data))
      graph.data.datasets.forEach((dataset) => dataset.data.push(data))
      graph.update()
    }
  }, [state,chartContainer,chartConfig]);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setGraph(newChartInstance);
    }
  }, [chartContainer, chartConfig]);

  return (
    <>
    {/* {console.log(state.data)} */}
    <div className='container text-center'>
    <h4> Leader Board <br/> Top 10 Solar Sites </h4>
      
    </div>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">
      <input type='radio' id='name'  name='name' onChange={changeHandler} checked={state.option === 'name'}/>
      Name<br/> _</th>
      <th scope="col">
      <input type='radio' id='net' name='size_kW'  onChange={changeHandler} checked={state.option === 'size_kW'} />
      System Size <br/> [kW]</th>
      <th scope="col">
      <input type='radio' id='production'  name='production' onChange={changeHandler}  checked={state.option === 'production'} />
      Production <br/> [kWh]</th>
      <th scope="col">
      <input type='radio' id='usage_kWh'  name='usage_kWh' onChange={changeHandler} checked={state.option === 'usage_kWh'}/>
      Consumption <br/> [kWh]</th>
      <th scope="col">
      <input type='radio' id='net' name='net'  onChange={changeHandler} checked={state.option === 'net'} />
      NET <br/> [kWh]</th>

    </tr>
    
  </thead>
  <tbody>
    {state.data.map((site,index) => {
      return(
        <>
      <tr>
      
        <th scope='row'>{index+1}</th>
        <td>{site.name}</td>
        <td>{site.size_kW}</td>
        <td>{site.production}</td>
        <td>{site.usage_kWh}</td>
        <td>{site.net}</td>
      </tr>
      </>)
    })}
    </tbody>
    </table>

      <div className='comparebar col-md-12 row'>
        <canvas ref={chartContainer} />
      </div>
    
    </>
  )
}