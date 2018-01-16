export const login = (origin, message) => {
  if (origin !== window.location.origin) {
    Object.keys(message).forEach((index, key) => {
      try {
        window.localStorage.setItem(index, message[index]);
      } catch (error) {
        console.log(error);
      }
    });
  }

  const { token, userRequest } = message;
  const currentUser = JSON.parse(userRequest);
  return {
    type: 'LOGIN',
    token,
    currentUser,
  };
};

export const logout = () => {
  window.localStorage.clear();
  window.parent.postMessage({ type: 'token_expired' }, '*');
  return { type: 'LOGOUT' };
};
