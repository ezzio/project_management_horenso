import axios from 'axios';
import { API } from './configApi';

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
  getLinePlot: (params) => {
    return axios
      .post(`${API}/dashboard/get-line-plot`, {
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
