import axios from "axios";

// const API = process.env.REACT_APP_API_URL;
const API = "https://servernckh.herokuapp.com";


const userApi = {
  login: (params) => {
    return axios
      .post(`${API}/login/`, {
        user_name: params.username,
        password: params.password,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  signUp: (params) => {
    return axios
      .post(
        `${API}/register/`,
        // 'https://servernckh.herokuapp.com/register/',
        {
          user_name: params.username,
          password: params.password,
        }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default userApi;
