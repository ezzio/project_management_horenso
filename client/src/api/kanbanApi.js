import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
const KanbanAPI = {
  ListKanbanOfJob: (params) => {
    return axios
      .post(`http://localhost:4000/Job/ListJobs`, {
        owner: localStorage.getItem('owner'),
        projectowner: localStorage.getItem('projectowner')
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
    .post(`http://localhost:4000/Job/create_a_Job`, {
      owner: localStorage.getItem('owner'),
      projectowner: localStorage.getItem('projectowner'),
      title: params.title,
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
    .post(`http://localhost:4000/Job/delete_Job`, {
      owner: localStorage.getItem('owner'),
      projectowner: localStorage.getItem('projectowner'),
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
    .post(`http://localhost:4000/Job/edit_Job`, {
      owner: localStorage.getItem('owner'),
      projectowner: localStorage.getItem('projectowner'),
      // kanban_id: params.kanban_id,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  }
};

export default KanbanAPI;