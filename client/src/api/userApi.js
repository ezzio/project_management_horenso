import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
const userApi = {
  login: (params) => {
    return axios
      .post(`${API}/login`, {
        username: params.username,
        password: params.password,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default userApi;
