import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { deleteUser, signin, signup, updatePassword, updateUser } from './asyncActions';
import { IUserState } from './types';


//@ts-ignore
const user = JSON.parse(localStorage.getItem('profile'));

const initialState: IUserState = {
  status: 'idle',
  user: user ? user.result : null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action)=> {
        state.status = 'succeeded';
        state.user = action.payload.result;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(signin.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signin.fulfilled, (state, action)=> {
        state.status = 'succeeded';
        state.user = action.payload.result;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(updateUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'error';
      })
  }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;