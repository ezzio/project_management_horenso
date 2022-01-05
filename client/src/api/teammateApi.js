import axios from "axios";

const API = "https://servernckh.herokuapp.com";

const TeammateAPI = {
  getAll: (params) => {
    return axios
      .post(`${API}/project/listMemberInProject`, {
        idProject: localStorage.getItem("projectId"),
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
        projectId: localStorage.getItem("projectId"),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  deleteTeammate: (username) => {
    return axios
      .post(`${API}/project/deleteUserInProject`, {
        user_name: username,
        projectId: localStorage.getItem("projectId"),
        owner: localStorage.getItem("projectowner"),
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
        projectId: localStorage.getItem("projectId"),
        owner: localStorage.getItem("projectowner"),
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
