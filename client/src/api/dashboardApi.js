import axios from 'axios';

const API = 'https://servernckh.herokuapp.com';

const dashboardApi = {
  getAllJob: (params) => {
    return axios
      .post(`${API}/dashboard/get-all-job`, {
        idProject: params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getAllTask: (params) => {
    return axios
      .post(`${API}/dashboard/get-all-task`, {
        idProject: params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getTimeLine: (params) => {
    return axios
      .post(`${API}/dashboard/get-time-line`, {
        idProject: params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default dashboardApi;
