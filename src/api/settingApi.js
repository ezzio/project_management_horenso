import axios from "axios";
import { API } from "./configApi";

const settingApi = {
  getInfoProject: (idProject) => {
    return axios
      .post(`${API}/project/listSettingPage`, {
        idUser: localStorage.getItem("access_token"),
        idProject: idProject,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  renameProject: (params) => {
    return axios
      .post(`${API}/project/renameProject`, {
        idUser: localStorage.getItem("access_token"),
        idProject: params.idProject,
        newNameProject: params.newProjectName,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteProject: (params) => {},

  transferOwnerShip: (params) => {
    return axios
      .post(`${API}/project/transferProject`, {
        idUser: localStorage.getItem("access_token"),
        idProject: params.idProject,
        user_name: params.user_name,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default settingApi;
