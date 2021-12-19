import axios from "axios";

// const API = process.env.REACT_APP_API_URL;
const API = "https://servernckh.herokuapp.com";
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
      .post(`${API}/Job/delete_Job`, {
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
    return axios
      .post(`${API}/Job/edit_Job`, {
        owner: localStorage.getItem("access_token"),
        projectowner: localStorage.getItem("projectowner"),
        kanban_id: params.id_job,
        priority: params.priority,
        // process: params.process,
        start_time: params.start_time,
        end_time: params.end_time.end_time,
        title: params.title,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default KanbanAPI;
