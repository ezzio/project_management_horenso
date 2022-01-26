import axios from "axios";
import { API } from "./configApi";

const KanbanAPI = {
  ListKanbanOfJob: (params) => {
    return axios
      .post(`${API}/Job/ListJobs`, {
        owner: localStorage.getItem("access_token"),
        projectowner: localStorage.getItem("projectowner"),
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  AddNewJob: (params) => {
    return axios
      .post(`${API}/Job/create_a_Job`, {
        owner: localStorage.getItem("access_token"),
        projectowner: localStorage.getItem("projectowner"),
        title: params.title,
        priority: params.priority,
        start_time: params.start_time,
        end_time: params.end_time,
        members: params.members,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  deleteJob: (params) => {
    return axios
      .post(`${API}/Job/deleteJob`, {
        owner: localStorage.getItem("access_token"),
        projectowner: localStorage.getItem("projectowner"),
        kanban_id: params.kanban_id,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  editJob: (params) => {
    console.log(params);
    const editedJob = {
      kanban_id: params.id_job,
      title: params.title,
      start_time: params.start_time,
      end_time: params.end_time,
      priority: params.priority,
      is_completed: params.is_completed,
      members: params.members.map((item) => item.user_name),
    };
    return axios
      .post(`${API}/Job/edit_Job`, editedJob)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default KanbanAPI;
