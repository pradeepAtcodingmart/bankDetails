import axios from 'axios';

const API = axios.create({
  baseURL: `https://vast-shore-74260.herokuapp.com`,
  timeout: 50000,
});

API.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    throw Error(error);
  }
);

export default API;
