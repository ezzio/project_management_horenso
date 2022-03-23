import axios from 'axios';
import { API } from './configApi';

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
        roomNameConversation: 'workSpace',
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
    return axios
      .post(`${API}/conversation/createARoomInConversation`, {
        name: params.name,
        idConversation: params.conversationId,
        roomNameConversation: 'teams',
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
    return axios
      .post(`${API}/conversation/createARoomInConversation`, {
        name: params.name,
        idConversation: params.conversationId,
        roomNameConversation: 'others',
        memberInRoomUserName: params.members,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  listRoomConversation: (params) => {
    return axios
      .post(`${API}/conversation/listRoomConversation`, {
        idRoomConversation: params.idRoom,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  deleteChannel: (params) => {
    return axios
      .post(`${API}/conversation/deletRoomInConversation`, {
        idRoom: params.idRoom,
        idProject: params.idProject,
        roomNameConversation: params.roomNameConversation,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  inviteMemberToRoom: (params) => {
    return axios
      .post(`${API}/conversation/inviteMemberToChannel`, {
        idRoom: params.idRoom,
        listUserInviteToChannel: params.listUserInviteToChannel,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  changeNameOfRoom: (params) => {
    return axios
      .post(`${API}/conversation/renameChannel`, {
        idRoom: params.idRoom,
        nameChange: params.nameChange,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  reactionMessage: (params) => {
    console.log(params);
    return axios
      .post(`${API}/conversation/likeAndDislikeText`, {
        idRoom: params.idRoom,
        idTextChat: params.idTextChat,
        type: params.type,
        idUser: params.idUser,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  replyMessage: (params) => {
    console.log(params);
    return axios
      .post(`${API}/conversation/replyMessage`, {
        idRoom: params.idRoom,
        idTextChat: params.idTextChat,
        messageReply: params.messageReply,
        idUser: params.idUser,
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
