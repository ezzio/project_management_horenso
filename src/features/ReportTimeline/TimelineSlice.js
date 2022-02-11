import { createSlice } from "@reduxjs/toolkit";

const initalTimeLines = [
    {
        id: 1,
        title: 'Make a features parts',
        performers: "UI Team",
        description:
            'Add modules Redux Toolkits and React redux, set store in index.js',
        start_time: '15th July',
        end_time: '15th August',
        proccess: 'incompleted',
    },
    {
        id: 2,
        title: 'Database Contribute',
        performers: "Backend Team",
        description:
            'Create Database and connect to server',
        start_time: 'September',
        end_time: '2022 Jan',
        proccess: 'incompleted',
    },
    {
        id: 3,
        title: 'Build Website Server',
        performers: "Backend Team",
        description:
            'Coding Server for Website',
        start_time: 'October',
        end_time: 'December',
        proccess: 'incompleted',
    },
    {
        id: 4,
        title: 'Creating Github',
        performers: "UI team",
        description:
            'Build a Client Github Clone',
        start_time: 'December',
        end_time: '2022 Feb',
        proccess: 'completed',
    },
    {
        id: 5,
        title: 'Creating Store',
        performers: "UI team",
        description:
            'Create a Store Page',
        start_time: 'January',
        end_time: '2022 Feb',
        proccess: 'completed',
    },
];

const timeline = createSlice({
    name: 'timelines',
    initialState: initalTimeLines,
    reducers: {
        addTimeLine: (state, action) => {
            const newTimeLine = action.payload;
            console.log(newTimeLine);
            state.push(newTimeLine);
        }
    }
})

const { reducer, actions } = timeline;
export const { addTimeLine } = actions;
export default reducer;