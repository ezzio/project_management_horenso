import { createSlice } from "@reduxjs/toolkit";

const initalKanbans = [
  {
    id_job: 0,
    title: "Important feature fix",
    process: "100%",
    priority: "High",
    is_completed: true,
    start_time: "",
    end_time: "",
    members: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://labhouse.vn/Content/ImageUpload/LAB/dlgECMSItem/163/avatar6%20(1).png",
      "https://anest.dev/assets/images/avatar.png",
      "https://cdn5.vectorstock.com/i/1000x1000/25/54/businessman-profile-ico-vector-20022554.jpg",
      "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
      "https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/17786/optimized_large_thumb_stage.jpg",
    ],
  },
  {
    id_job: 1,
    title: "Important feature fix",
    process: "30%",
    priority: "Medium",
    is_completed: false,
    start_time: "2021-10-11",
    end_time: "2021-10-21",
    members: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://labhouse.vn/Content/ImageUpload/LAB/dlgECMSItem/163/avatar6%20(1).png",
      "https://anest.dev/assets/images/avatar.png",
      "https://cdn5.vectorstock.com/i/1000x1000/25/54/businessman-profile-ico-vector-20022554.jpg",
      "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
      "https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/17786/optimized_large_thumb_stage.jpg",
    ],
  },
  {
    id_job: 2,
    title: "Horenso",
    process: "50%",
    priority: "Low",
    is_completed: false,
    start_time: "2021-06-12",
    end_time: "2021-10-31",
    members: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://labhouse.vn/Content/ImageUpload/LAB/dlgECMSItem/163/avatar6%20(1).png",
      "https://anest.dev/assets/images/avatar.png",
      "https://cdn5.vectorstock.com/i/1000x1000/25/54/businessman-profile-ico-vector-20022554.jpg",
      "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
      "https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/17786/optimized_large_thumb_stage.jpg",
    ],
  },
  {
    id_job: 3,
    title: "Kanban",
    process: "12%",
    priority: "High",
    is_completed: false,
    start_time: "",
    end_time: "",
    members: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://labhouse.vn/Content/ImageUpload/LAB/dlgECMSItem/163/avatar6%20(1).png",
      "https://anest.dev/assets/images/avatar.png",
      "https://cdn5.vectorstock.com/i/1000x1000/25/54/businessman-profile-ico-vector-20022554.jpg",
      "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
      "https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/17786/optimized_large_thumb_stage.jpg",
    ],
  },
];

const kanban = createSlice({
  name: "kanbans",
  initialState: initalKanbans,
  reducers: {
    addKanban: (state, action) => {
      //   const newKanban = action.payload;
      state.push(action.payload);
    },

    deleteKanban: (state, action) => {
      console.log(action.payload);
      const deleteKanbanID = action.payload;
      return state.filter((kanban) => kanban.id_job !== deleteKanbanID);
    },

    updateKanban: (state, action) => {
      const editedKanban = action.payload;
      console.log(action.payload.id_job);
      const kanbanIndex = state.findIndex(
        (kanban) => kanban.id_job === editedKanban.id_job
      );
      if (kanbanIndex >= 0) {
        state.splice(kanbanIndex, 1, editedKanban);
      }
    },
  },
});

const { reducer, actions } = kanban;
export const { addKanban, deleteKanban, updateKanban } = actions;
export default reducer;
