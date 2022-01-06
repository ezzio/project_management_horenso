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

  deleteTeammate: (params) => {
    return axios
      .delete(`${API}/project/deleteMember`, {
        owner: localStorage.getItem("access_token"),
        projectowner: localStorage.getItem("projectowner"),
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

export default TeammateAPI;
