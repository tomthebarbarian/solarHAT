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
    markers: [],
    sites: [],
    userSites: [],
    count: 0
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


  useEffect(() => {
    //fetch data with API call
    axios.get("/login")
      .then(res => {
        console.log('------------get/login------------', res)
        if (res.data.code === 200) {
          setState(prev => ({ ...prev, logged: true, user: res.data.user[0] }))

          console.log('login check', state.user._id)
          fetchData(state.user._id)
            .then((data) => {
              setState((prev) => ({
                ...prev,
                sites: data.sites,
                userSites: data.userSites,
              }))
            })
        }
      })
      .catch((error) => console.log(`ERROR ${error}`));



    return cleanup();
  }, [state.logged, state.count]);



  return {
    state,
    setState,
    loading,
    apiLogin,
    apiLogout,
    apiRegister,
  };
}
