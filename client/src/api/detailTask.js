import axios from 'axios';

const API = 'https://servernckhv2.herokuapp.com';

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
        idProjectOwner: params.idProjectOwner,
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
  changeCompletedDetailTask: (params) => {
    return axios
      .post(`${API}/Tasks/completeAndUncompleteDetailTask`, {
        ...params,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  listConversationsInDetailTask: (params) => {
    return axios
      .post(`${API}/Tasks/listMessageInDetailTask`, {
        taskOwner: params.idTask,
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
