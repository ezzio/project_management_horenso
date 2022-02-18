import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: 'ddkhoa120620',
  displayName: 'Duong Dang Khoa',
  avatarURL: 'https://joeschmoe.io/api/v1/random',
  phone: '012345678',
  bio: "Hi😋, I'm Pum",
  email: 'khoab1809697@student.ctu.edu.vn',
  company: 'App Core',
  location: 'Soc Trang',
  projectOwner: [
    { id: 1, title: 'Horenso', progress: 30 },
    { id: 2, title: 'Kanso', progress: 91 },
  ],
};

export const CheckProfileMember = createSlice({
  name: 'checkProfileMember',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default CheckProfileMember.reducer;
