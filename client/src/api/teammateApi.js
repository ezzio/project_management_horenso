import axios from "axios";
import { API } from "./configApi";

const TeammateAPI = {
  getAll: (params) => {
    return axios
      .post(`${API}/project/listMemberInProject`, {
        idProject: params,
        owner: localStorage.getItem("access_token"),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  addTeammate: (params) => {
    return axios
      .post(`${API}/project/addAMemberIntoProject`, {
        user_name: params.user_name,
        projectowner: localStorage.getItem("access_token"),
        projectId: params.idProject,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  deleteTeammate: (params) => {
    return axios
      .post(`${API}/project/deleteUserInProject`, {
        user_name: params.user_name,
        projectId: params.idProject,
        owner: localStorage.getItem("access_token"),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  editTeammate: (params) => {
    return axios
      .post(`${API}/project/editRoleOfUser`, {
        user_name: params.user_name,
        newRole: params.newRole,
        projectId: params.idProject,
        owner: localStorage.getItem("access_token"),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default TeammateAPI;
