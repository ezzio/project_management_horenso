import { API } from './configApi';
import axios from 'axios';

const projectApi = {
  createNew: (params) => {
    return axios
      .post(`${API}/project/create_a_project/`, params)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  updateProgress: (params) => {
    return axios
      .post(`${API}/project/update-progress-project`, params)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default projectApi;
