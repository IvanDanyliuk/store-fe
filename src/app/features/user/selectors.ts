import { RootStateType } from '../store';

export const selectUser = (state: RootStateType) => state.user.user;