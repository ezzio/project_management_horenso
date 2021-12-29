const { default: axios } = require('axios');

const API = 'https://servernckh.herokuapp.com/project';

const projectApi = {
  createNew: (params) => {
    return axios
      .post(`${API}/create_a_project/`, {
        params,
      })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default projectApi;
