import axios from "axios";
import { API } from "./configApi";

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

  deleteFile(params) {
    return axios
      .post(`${API}/zipFile/removeZipFile`, {
        idProject: params.idProject,
        name_attachment: params.name_attachment,
      })
      .then((response) => {
        return response.data;
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default storageAPI;
