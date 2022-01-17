import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    workspace: [
        'Project Ideas',
        'Confirm Content',
        'Waiting for review',
    ],
    teams: [
        'Developers', 
        'Designer',
    ],
    others: [
        'Off-Topic', 
        'Archive',
    ],
    members: [
        'Dang Khoa',
        'Huu Thang',
        'Chanh Nhut',
        'Phu Nguyen',
        'Tuong Minh',
    ]
}

export const createChannelSlice = createSlice({
    name: "createChannel",
    initialState,
    reducers: {
        addWorkspaceChannel: (state, action) => {
            console.log(action.payload.name);
            state.workspace.push(action.payload.name);
        },
        addTeamsChannel: (state, action) => {
            console.log(action.payload.name);
            state.teams.push(action.payload.name);
        },
        addOthersChannel: (state, action) => {
            console.log(action.payload.name);
            state.others.push(action.payload.name);
        }
    }
})

export const {addWorkspaceChannel, addTeamsChannel, addOthersChannel} = createChannelSlice.actions;
export default createChannelSlice.reducer;