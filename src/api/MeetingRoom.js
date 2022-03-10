import axios from "axios";
import { API } from "./configApi";

const meetingRoomApi = {
  listMeetingRoomInProject: (params) => {
    // console.log(params);
    return axios
      .post(`${API}/MeetingRoom/listMeetingRoom`, {
        idProject: params.idProject,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  createMeetingRoom: (params) => {
    console.log(params);
    return axios
      .post(`${API}/MeetingRoom/createMeetingRoom`, {
        name: params.name,
        description: params.description,
        timeStartMeeting: params.startTime,
        projectowner: params.idProject,
        memberInMeetingRoom: params.members,
        end_time: params.endTime,
        start_time: params.startTime,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteMeetingRoom: (params) => {

    return axios
      .post(`${API}/MeetingRoom/deleteMeetingRoom`, {
        idMeetingRoom: params.idRoom,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default meetingRoomApi;
