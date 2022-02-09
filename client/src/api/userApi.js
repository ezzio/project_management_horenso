import axios from 'axios';
import { API } from './configApi';

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
      .post(`${API}/register/`, params)
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
        owner: localStorage.getItem('access_token'),
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
  editUser: (params) => {
    return axios
      .post(`${API}/user/editUserInfo`, {
        owner: localStorage.getItem('access_token'),
        display_name: params.display_name,
        bio: params.bio,
        company: params.company,
        location: params.location,
        email: params.email,
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
