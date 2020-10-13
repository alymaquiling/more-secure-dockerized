import axios from "axios";

const API_URL = "http://localhost:3000/api/ping";

const ping = (hostname) => {
  return axios.post(API_URL, { hostname }).then((response) => {
    return response.data;
  });
};

export default { ping };
