import axios from "axios";

const API = "https://servernckh.herokuapp.com";

const storageAPI = {
  getAll(params) {
    return axios
      .post(`${API}/project/listAllAttachmentInProject`, {
        owner: localStorage.getItem("access_token"),
        idproject: params.idProject,
      })
      .then((response) => {
        // console.log(response.data.allAttachment);
        return response.data.allAttachment;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default storageAPI;
