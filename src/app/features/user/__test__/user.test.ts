import store from '../../store';
import { logout, clearError, setLanguage } from '../reducers';
import { signin, signup, updateUser, updatePassword, deleteUser } from '../asyncActions';
import { setupUserErrorHandlers, setupUserSuccessHandlers } from '../../../../utils/serverMocks/user';
import { userMock, userToUpdateMock } from '../../../../utils/testDataMocks';


describe('Tests for the User reducers: success cases', () => {
  beforeEach(() => {
    setupUserSuccessHandlers();
  });

  test('should get user by dispatching the signup action', async () => {
    let state = store.getState().user;
    await store.dispatch(signup(userMock));
    state = store.getState().user;
    expect(state.user!.firstName).toBe(userMock.firstName);
  });

  test('should get user by dispatching the signin action', async () => {
    let state = store.getState().user;
    await store.dispatch(signin({ email: userMock.email, password: userMock.password }));
    state = store.getState().user;
    expect(state.user!.firstName).toBe(userMock.firstName);
  });

  test('should update user data by dispatching the updateUser action', async () => {
    let state = store.getState().user;
    await store.dispatch(signup(userMock));
    state = store.getState().user;
    await store.dispatch(updateUser(userToUpdateMock));
    state = store.getState().user;
    expect(state.user!.firstName).toBe(userToUpdateMock.userData.firstName);
  });

  test('should update a password by dispatching the updatePassword action', async () => {
    let state = store.getState().user;
    await store.dispatch(signup(userMock));
    state = store.getState().user;
    await store.dispatch(updatePassword({ 
      id: userToUpdateMock.id, 
      currentPassword: userMock.password, 
      newPassword: userToUpdateMock.userData.password 
    }));
    state = store.getState().user;
    expect(state.user!.password).toBe(userToUpdateMock.userData.password);
  });

  test('should delete a user by dispatching the deleteUser action', async () => {
    let state = store.getState().user;
    await store.dispatch(deleteUser(userMock._id!));
    state = store.getState().user;
    expect(state.user).toBeNull();
  });

  test('should clear the user field by dispatching the logout action', async () => {
    let state = store.getState().user;
    await store.dispatch(signup(userMock));
    state = store.getState().user;
    store.dispatch(logout());
    state = store.getState().user;
    expect(state.user).toBeNull();
  });

  test('should change the language by dispatching the setLanguage action', async () => {
    let state = store.getState().user;
    await store.dispatch(signup(userMock));
    state = store.getState().user;
    store.dispatch(setLanguage('ua'));
    state = store.getState().user;
    expect(state.language).toBe('ua');
  });
});


describe('Tests for the User reducers: error cases', () => {
  beforeEach(() => {
    setupUserErrorHandlers();
  });

  test('should show the signup error by dispatching the signup action', async () => {
    let state = store.getState().user;
    await store.dispatch(signup(userMock));
    state = store.getState().user;
    expect(state.error).toBe('alertSignupMessage');
  });

  test('should show the signin error by dispatching the signin action', async () => {
    let state = store.getState().user;
    await store.dispatch(signin({ email: userMock.email, password: userMock.password }));
    state = store.getState().user;
    expect(state.error).toBe('alertSigninMessage');
  });

  test('should show the update user error by dispatching the updateUser action', async () => {
    let state = store.getState().user;
    await store.dispatch(updateUser(userToUpdateMock));
    state = store.getState().user;
    expect(state.error).toBe('alertUpdateUserMessage');
  });

  test('should show the update password error by dispatching the updatePassword action', async () => {
    let state = store.getState().user;
    await store.dispatch(updatePassword({ 
      id: userToUpdateMock.id, 
      currentPassword: userMock.password, 
      newPassword: userToUpdateMock.userData.password 
    }));
    state = store.getState().user;
    expect(state.error).toBe('alertUpdatePasswordMessage');
  });

  test('should show the delete user error by dispatching the deleteUser action', async () => {
    let state = store.getState().user;
    await store.dispatch(deleteUser(userMock._id!));
    state = store.getState().user;
    expect(state.error).toBe('alertDeleteUserMessage');
  });

  test('should set the error value as null by dispatching the clearError action', async () => {
    let state = store.getState().user;
    await store.dispatch(signup(userMock));
    state = store.getState().user;
    store.dispatch(clearError())
    state = store.getState().user;
    expect(state.error).toBeNull();
  });
});