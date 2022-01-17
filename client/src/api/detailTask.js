import axios from "axios";

const API = "https://servernckh.herokuapp.com";

export const detailTaskApi = {
  listAllDetailTask: (params) => {
    return axios
      .post(`${API}/Tasks/listAllDetailTask`, {
        taskOwner: params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  createADetailTask: (params) => {
    return axios
      .post(`${API}/Tasks/createNewDetailTask`, {
        taskOwner: params.idTask,
        title: params.name,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  editDetailTask: (params) => {
    return axios
      .post(`${API}/Tasks/editDetailTask`, {
        idDetailTask: params.idDetailTask,
        name: params.name,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteDetailTask: (params) => {
    return axios
      .post(`${API}/Tasks/deleteDetailTask`, {
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

export default detailTaskApi;
