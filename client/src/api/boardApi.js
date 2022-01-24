import axios from "axios";

const API = "https://servernckh.herokuapp.com";

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
  editTask: (params) => {
    return axios
      .post(`${API}/Tasks/editTask`, {
        ...params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteTask: (params) => {
    return axios
      .post(`${API}/Tasks/deleteTask`, {
        taskId: params.id,
        jobowner: params.idBoard,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  autoChangeColumn: (params) => {
    return axios
      .post(`${API}/Tasks/changeColumnTask`, {
        ...params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  checkCompleted: (params) => {
    return axios
      .post(`${API}/Tasks/completeAndUncompleteTask`, {
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
