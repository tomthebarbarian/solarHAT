import { useEffect, useState } from 'react';
import axios from 'axios';

//dummy data source
// import dayList from '../data/days';
// import dailyAppointments from '../data/appointments';

import './App.scss';
import { cleanup } from '@testing-library/react/dist';
import { fetchData, apiCall, logout, login, register } from '../helpers/api';

export default function useAppData(props) {
  //iniitalize app state and set day to Monday
  const [state, setState] = useState({
    logged: false,
    user: null,
    map: {},
    marker: { lat: 45, lng: -100 },
    sites: [
      {
        _id: 'ObjectId(619d5d325e08dcf685043d24)',
        name: 'aj-cottage',
        coord: [45.318476, -75.765152],
        province: 'ON',
        usage_kWh: 4.5,
        size_kW: 10.5,
      },
    ],
    model: [
      {
        _id: 'ObjectId(619d5d325e07cef685043d20)',
        NL: {
          pv_monthly_avg: [51, 75, 95, 96, 98, 100, 103, 99, 85, 63, 44, 38],
          cost_cents_avg: 13.8,
        },
      },
    ],
  });

  const [loading, setLoading] = useState(false);

  function apiLogout() {
    return axios.get("/logout")
  }

  function apiLogin(user) {
    return axios.post('/login', {
      email: user.email,
      password: user.password
    })
  }

  function apiRegister(user) {
    return axios.post('/register', {
      name: user.name,
      email: user.email,
      password: user.password
    })

  }

  function resetdB() {
    apiCall('reset', setLoading, setState);
  }
  function fetchDays() {
    apiCall('days', setLoading, setState);
  }
  function fetchAppts() {
    apiCall('appts', setLoading, setState);
  }

  useEffect(() => {
    //fetch data with API call
    axios.get("/login")
      .then(res => {
        console.log('------------get/login------------', res)
        if (res.data.code === 200) {
          setState(prev => ({ ...prev, logged: true, user: res.data.user[0] }))


          fetchData(state.user._id)
            .then((data) => {
              setState((prev) => ({
                ...prev,
                sites: data.sites,
                model: data.model,
                userSites: data.userSites,
              }))
            })
        }
      })
      .catch((error) => console.log(`ERROR ${error}`));



    return cleanup();
  }, [state.logged]);



  return {
    state,
    setState,
    loading,
    apiLogin,
    apiLogout,
    apiRegister,
    apiCall,
    resetdB,
    fetchDays,
    fetchAppts,
  };
}
