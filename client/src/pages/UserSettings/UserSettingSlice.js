import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: 'User',
    bio: 'User bio',
    company: '',
    location: '',
    email: '',
    link: '',
    facebook: '',
    avatarURL: "https://avatars.githubusercontent.com/u/72656184?v=4",
}

export const userSettingSlice = createSlice({
    name: 'userSetting',
    initialState,
    reducers: {
        editProfile: (state, action) => {
            console.log(action.payload)
            state.name = action.payload.name;
            state.bio = action.payload.bio;
            state.company = action.payload.company;
            state.location = action.payload.location;
            state.email = action.payload.email;
            state.link = action.payload.link;
            state.facebook = action.payload.facebook;
        },
        uploadAvatar: (state, action) => {
            console.log(action.payload);
            state.avatarURL = action.payload;
        }
    }

})

export const { editProfile, uploadAvatar } = userSettingSlice.actions;
export default userSettingSlice.reducer;