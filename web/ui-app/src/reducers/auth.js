const intialState = {
  token: null,
  currentUser: null,
  authenticated: window.self !== window.top ? false : true,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authenticated: true,
        token: action.error ? null : action.token,
        currentUser: action.error ? null : action.currentUser,
      };

    case 'LOGOUT':
      return {
        ...state,
        authenticated: false,
        token: null,
        currentUser: null,
      };
    default:
      return state;
  }
};
