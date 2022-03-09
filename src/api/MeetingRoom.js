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
        // name: "Cuoc Hop Hang Tuan",
        // description: "Tajo Thu",
        // timeStartMeeting: "2022-02-03",
        // projectowner: "620f026c36bc630024b33ede",
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  //   listmeetingRoomInProject: (params) => {
  //     return axios
  //       .post(`${API}/MeetingRoom/listMeetingRoom`, {
  //         idProject: params.idProject,
  //       })
  //       .then((response) => {
  //         return response.data;
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   },
};

export default meetingRoomApi;
