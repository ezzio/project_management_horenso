import axios from 'axios';

const API = 'https://servernckh.herokuapp.com';

export const boardApi = {
  fetch: (params) => {
    return axios
      .post(`${API}/Tasks/ListTasks/kaban`, {
        jobowner: params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  addTask: (params) => {
    console.log(params);
    return axios
      .post(`${API}/Tasks/create_a_new_task/`, {
        ...params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
