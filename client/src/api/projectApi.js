const { default: axios } = require("axios");

const API = 'https://servernckhv2.herokuapp.com';
// const API = "http://localhost:4000/project";

const projectApi = {
  createNew: (params) => {
    return axios
      .post(`${API}/create_a_project/`, params)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default projectApi;
