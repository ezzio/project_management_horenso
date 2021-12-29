import axios from "axios";

// const API = process.env.REACT_APP_API_URL;
const API = "https://servernckh.herokuapp.com";
// const API = "http://localhost:4000";

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
  listUserInfo: () => {
    return axios
      .post(`${API}/user`, {
        owner: localStorage.getItem("access_token"),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  uploadAvatar: (params) => {
    return axios
      .post(`${API}/user/uploadAvatar`, params)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default userApi;
