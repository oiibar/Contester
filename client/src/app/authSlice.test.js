import authReducer, { loginSuccess, logoutSuccess } from './authSlice';

describe('auth slice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
  };

  it('should return the initial state by default', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle loginSuccess', () => {
    const user = { id: 1, name: 'Alice' };
    const state = authReducer(initialState, loginSuccess(user));
    expect(state).toEqual({
      user,
      isAuthenticated: true,
    });
  });

  it('should handle logoutSuccess', () => {
    const loggedInState = { user: { id: 1 }, isAuthenticated: true };
    const state = authReducer(loggedInState, logoutSuccess());
    expect(state).toEqual(initialState);
  });
});
