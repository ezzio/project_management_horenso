import { createSlice, current } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  columns: [
    {
      id_column: 0,
      name: "Backlog",
      tasks: [
        {
          id: 0,
          title: "This is the title of task 0",
          description: "Description of task 0",
          progress: "100",
          level: "high",
          is_completed: false,
          isOverdue: false,
          startTime: "2021-8-15",
          endTime: "2022-8-15",
          taskers: [
            {
              id: 1,
              name: "Nhut",
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              id: 2,
              name: "Pum",
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              id: 3,
              name: "Minh",
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              id: 4,
              name: "Nguyen",
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              id: 5,
              name: "Thang",
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              id: 6,
              name: "Kevin",
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
          ],
        },
        {
          id: 1,
          title: "This is the title of task 2",
          description: "Description of task 0",
          progress: "60",
          level: "low",
          is_completed: false,
          startTime: "2021/02/15",
          endTime: "2021/02/20",
          isOverdue: false,
          taskers: [
            {
              id: 1,
              name: "Nhut",
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              id: 2,
              name: "Pum",
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              id: 3,
              name: "Minh",
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              id: 4,
              name: "Nguyen",
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
          ],
        },
      ],
    },
    { id_column: 1, name: "In process", tasks: [] },
    { id_column: 2, name: "Review", tasks: [] },
    { id_column: 3, name: "Completed", tasks: [] },
  ],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      state.columns[0].tasks.push(action.payload);
      console.log(state.columns[0].tasks);
    },

    deleteTask: (state, action) => {
      const { deleteTaskId, columnId } = action.payload;
      state.columns[columnId].tasks = state.columns[columnId].tasks.filter(
        (task) => task.id !== deleteTaskId
      );
    },

    updateTask: (state, action) => {
      // console.log(action.payload);
      const { editTask, columnId } = action.payload;
      // console.log(editTask.id, columnId);
      const taskIndex = state.columns[columnId].tasks.findIndex(
        (task) => task.id === editTask.id
      );

      if (taskIndex >= 0) {
        state.columns[columnId].tasks[taskIndex] = editTask;
      }
    },
    automaticChangeStatusTask: (state) => {
      let currentTask;
      if (state.columns[0].tasks)
        state.columns[0].tasks.map((task, index) => {
          if (moment().isBetween(task.startTime, task.endTime)) {

            currentTask = task;
            state.columns[1].tasks.push(currentTask);
            state.columns[0].tasks.splice(index, 1);
          }
        });
      if (state.columns[1].tasks)
        state.columns[1].tasks.map((task, index) => {
          if (task.progress === "100") {
            currentTask = task;
            state.columns[2].tasks.push(currentTask);
            state.columns[1].tasks.splice(index, 1);
          } else if (moment().isAfter(task.endTime)) {
            task.isOverdue = true;
          } else {
            task.isOverdue = false;
          }
          if (!moment().isBetween(task.startTime, task.endTime)) {
            currentTask = task;
            state.columns[0].tasks.push(currentTask);
            state.columns[1].tasks.splice(index, 1);
          }
        });
      if (state.columns[2].tasks)
        state.columns[2].tasks.map((task, index) => {
          if (task.is_completed) {
            currentTask = task;
            state.columns[3].tasks.push(currentTask);
            state.columns[2].tasks.splice(index, 1);
          }
        });
    },
  },
});

export const { deleteTask, updateTask, automaticChangeStatusTask, addNewTask } =
  boardSlice.actions;
export default boardSlice.reducer;
