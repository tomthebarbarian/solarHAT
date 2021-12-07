
import axios from "axios";
const DELAY = 2000

//api call to fetch data and returns a promise
export const fetchData = (userId) => {
  return Promise.all([
    axios.get("/api/sites"),
    axios.get(`/api/u/sites/${userId}`),
  ])
    .then(res => {
      const data = {
        sites: res[0].data,
        userSites: res[1].data
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

