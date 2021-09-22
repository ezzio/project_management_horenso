import {axios} from 'axios';
const userApi = {
  login: (params) => {
   console.log(params);
    let bodyParams  = JSON.stringify(params);
    // axios
    //   .get("http://localhost:4000/project", { withCredentials: true })
    //   .then((response) => {
    //     if (response.data.redirect) {
    //       // window.location = response.data.redirect;
    //     }
    //   });
    console.log(bodyParams);
   return axios
    .post(
      "http://localhost:4000/login",
      {
        bodyParams
      },
      { withCredentials: true }
    )
    .then((response) => {
      if (response.data.redirect) {
        localStorage.setItem('id' , response.data.id);
        window.location = response.data.redirect;
      } else {
      }
    });
  },
};

export default userApi;
