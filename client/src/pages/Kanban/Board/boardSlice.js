import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  columns: [
    {
      id_column: 0,
      name: 'Backlog',
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
    { id_column: 1, name: 'In process', tasks: [] },
    { id_column: 2, name: 'Review', tasks: [] },
    { id_column: 3, name: 'Completed', tasks: [] },
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
  },
});

export const { updateOnDnd } = boardSlice.actions;
export default boardSlice.reducer;
