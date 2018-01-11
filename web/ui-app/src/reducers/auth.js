const intialState = {
  token: null,
  currentUser: null,
  authenticated: process.env.NODE_ENV === 'development' ? false : true,
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

    default:
      return state;
  }
};
