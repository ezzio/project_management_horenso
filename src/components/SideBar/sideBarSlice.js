import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from 'api/configApi';
import axios from 'axios';

const initialState = {
  role: false,
};

export const checkRoleUser = createAsyncThunk(
  'user/check-role',
  async (params) => {
    const currentUser = await axios
      .post(`${API}/user/checkRoleUserInProject`, {
        id: params.id,
        idProject: params.idProject,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return currentUser;
  }
);

const sideBarSlice = createSlice({
  name: 'sidebar',
  initialState,
  extraReducers: {
    [checkRoleUser.fulfilled]: (state, action) => {
      if (action.payload && action.payload.isSuccess) {
        state.role = action.payload.result[0].tag;
      } else {
        state.role = false;
      }
    },
  },
});

export default sideBarSlice.reducer;
