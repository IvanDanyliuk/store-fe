import { RootStateType } from '../store';

export const selectUser = (state: RootStateType) => state.user.user;
export const selectUserStatus = (state: RootStateType) => state.user.status;