import * as actionTypes from "../constants/actionTypes";
import { Api } from "../api";
import { persistInLocalStorage } from "../utils";

export const login = message => {
  persistInLocalStorage(message);
  const { token, userRequest } = message;
  const userInfo = JSON.parse(userRequest);
  return {
    type: actionTypes.USER_LOGIN_SUCCESS,
    token,
    userInfo
  };
};
