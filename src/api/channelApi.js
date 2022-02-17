import axios from "axios";
import { API } from "./configApi";

const channelApi = {
  getListChannel: (idProject) => {
    return axios
      .post(`${API}/conversation/listConversationInProject`, {
        idProject: idProject,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  addWorkSpaceChannel: (params) => {
    console.log(params);
    return axios
      .post(`${API}/conversation/createARoomInConversation`, {
        name: params.name,
        idConversation: params.conversationId,
        roomNameConversation: "workSpace",
        memberInRoomUserName: params.members,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  addTeamChannel: (params) => {
    console.log(params);
    return axios
      .post(`${API}/conversation/createARoomInConversation`, {
        name: params.name,
        idConversation: params.conversationId,
        roomNameConversation: "teams",
        memberInRoomUserName: params.members,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  addOtherChannel: (params) => {
    console.log(params);
    return axios
      .post(`${API}/conversation/createARoomInConversation`, {
        name: params.name,
        idConversation: params.conversationId,
        roomNameConversation: "others",
        memberInRoomUserName: params.members,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default channelApi;
