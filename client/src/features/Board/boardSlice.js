import { createSlice, current } from "@reduxjs/toolkit";

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
          startTime: "15/08/2021",
          endTime: "09/09/2021",
          taskers: [
            {
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
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
          startTime: "15/08/2021",
          endTime: "10/09/2021",
          taskers: [
            {
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
              avatar:
                "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
            },
            {
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
    updateOnDnd: (state, action) => {
      const { source, destination } = action.payload;

      if (!destination) return;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return;

      let tempTask = current(
        state.columns[source.droppableId].tasks[source.index]
      );

      if (destination.droppableId === source.droppableId) {
        state.columns[source.droppableId].tasks.splice(source.index, 1);
        state.columns[source.droppableId].tasks.splice(
          destination.index,
          0,
          tempTask
        );
        console.log(current(state.columns[source.droppableId].tasks));
      } else {
        state.columns[source.droppableId].tasks.splice(source.index, 1);
        state.columns[destination.droppableId].tasks.splice(
          destination.index,
          0,
          tempTask
        );
      }
    },

    deleteTask: (state, action) => {
      const { deleteTaskId, columnId } = action.payload;
      state.columns[columnId].tasks = state.columns[columnId].tasks.filter(
        (task) => task.id !== deleteTaskId
      );
    },

    updateTask: (state, action) => {
      const { newTask, columnId } = action.payload;
      const taskIndex = state.columns[columnId].tasks.findIndex(
        (task) => task.id === newTask.id
      );

      if (taskIndex >= 0) {
        state.columns[columnId].tasks[taskIndex] = newTask;
      }
    },
  },
});

export const { updateOnDnd, deleteTask, updateTask } = boardSlice.actions;
export default boardSlice.reducer;
