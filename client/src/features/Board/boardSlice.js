import { createSlice, current } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
  columns: [
    {
      id_column: 0,
      name: 'Backlog',
      tasks: [
        {
          id: 0,
<<<<<<< HEAD
          title: "This is the title of task 0",
          description: "Description of task 0",
          progress: "0",
          level: "high",
          is_completed: false,

          // format(mm/dd/yyyy)
          startTime: "08/15/2021",
          endTime: "09/09/2021",
=======
          title: 'This is the title of task 0',
          description: 'Description of task 0',
          progress: '100',
          level: 'high',
          is_completed: false,
          isOverdue: false,
          startTime: '2021-8-15',
          endTime: '2022-8-15',
>>>>>>> 9e500438bb26217d5c92c4d7cf3ca116f7ce635f
          taskers: [
            {
              avatar:
                'https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa',
            },
            {
              avatar:
                'https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa',
            },
            {
              avatar:
                'https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa',
            },
            {
              avatar:
                'https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa',
            },
            {
              avatar:
                'https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa',
            },
            {
              avatar:
                'https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa',
            },
          ],
        },
<<<<<<< HEAD
=======
        {
          id: 1,
          title: 'This is the title of task 2',
          description: 'Description of task 0',
          progress: '60',
          level: 'low',
          is_completed: false,
          startTime: '15/08/2021',
          endTime: '10/09/2021',
          isOverdue: false,
          taskers: [
            {
              avatar:
                'https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa',
            },
            {
              avatar:
                'https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa',
            },
            {
              avatar:
                'https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa',
            },
            {
              avatar:
                'https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa',
            },
          ],
        },
>>>>>>> 9e500438bb26217d5c92c4d7cf3ca116f7ce635f
      ],
    },
    { id_column: 1, name: 'In process', tasks: [] },
    { id_column: 2, name: 'Review', tasks: [] },
    { id_column: 3, name: 'Completed', tasks: [] },
  ],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
<<<<<<< HEAD
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

=======
>>>>>>> 9e500438bb26217d5c92c4d7cf3ca116f7ce635f
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
            console.log(index);
            currentTask = task;
            state.columns[1].tasks.push(currentTask);
            state.columns[0].tasks.splice(index, 1);
          } else {
            task.isOverdue = true;
          }
        });
      if (state.columns[1].tasks)
        state.columns[1].tasks.map((task, index) => {
          if (task.progress === '100') {
            currentTask = task;
            state.columns[2].tasks.push(currentTask);
            state.columns[1].tasks.splice(index, 1);
          } else if (!moment().isBetween(task.startTime, task.endTime)) {
            task.isOverdue = true;
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
