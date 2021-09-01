import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  columns: [
    {
      id_column: 0,
      title: 'Backlog',
      tasks: [
        {
          id: 0,
          title: 'This is the title of task 0',
        },
        {
          id: 1,
          title: 'This is the title of task 1',
        },
        {
          id: 2,
          title: 'This is the title of task 2',
        },
      ],
    },
    { id_column: 1, title: 'In process', tasks: [] },
    { id_column: 2, title: 'Review', tasks: [] },
    { id_column: 3, title: 'Completed', tasks: [] },
  ],
};

export const boardSlice = createSlice({
  name: 'board',
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

      const tempColumn = [...current(state.columns)];
      const sourceTask = tempColumn[source.droppableId].tasks[source.index];
      const tempTasks = tempColumn[source.droppableId].tasks;
    },
  },
});

export const { updateOnDnd } = boardSlice.actions;
export default boardSlice.reducer;
