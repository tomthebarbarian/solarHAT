
import axios from "axios";
const DELAY = 2000

//api call to fetch data and returns a promise
export const fetchData = (userId) => {
  return Promise.all([
    axios.get("/api/sites"),
    axios.get("/api/model"),
    axios.get(`/api/u/sites/${userId}`),
  ])
    .then(res => {
      const data = {
        sites: res[0].data,
        model: res[1].data,
        userSites: res[2].data
      }
      console.log('--------[fetch data]---------\n', data);
      return data;
    })
    .catch(error => `Error: ${error}`);
};

export const logout = (setState) => {
  return axios.get("/logout")

};

export const login = (user) => {
  axios.post('/login', {
    email: user.email,
    password: user.password
  })
};

export const register = (user) => {
  axios.post('/register', {
    name: user.name,
    email: user.email,
    password: user.password
  })

};


//helper function to make different api calls for testing
export function apiCall(param, setLoading, setState) {
  const apiURL = {
    days: '/api/days/',
    appts: '/api/appointments/',
    reset: '/api/debug/reset',
  };
  console.log(param, ':', apiURL[param]);

  //controls if loading spinner displays
  setLoading((prev) =>
    param === 'reset'
      ? true
      : false)

  //make api call for the specified parameter
  axios
    .get(apiURL[param])
    .then((res) => {
      console.log(res.data);
      //fetch all data at once
      fetchData()
        .then((all) => {
          setState((prev) => ({
            ...prev,
            day: '',
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data,
          }));
        })
        //because state has more parameters, it's important to have a .then  
        //this ensures proper rendering
        .then(() => {
          setTimeout(() => {
            setState((prev) => ({ ...prev, day: 'Monday' }));
            setLoading((prev) => false)
          },
            param === 'reset' ? DELAY : 0
          );
        });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};