import md5 from "js-md5";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from "../constants";
import { updateAppState } from './app';

export const login = ({username, password}) => {
  return dispatch => {
    dispatch({
      type: LOGIN
    });

    const body = {
      LoginForm: {
        username,
        password: md5(password)
      }
    };

    fetch("/api/login", {
      method: "POST",
      accept: "application/json",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Ошибка входа!");
      })
      .then(result => dispatch(loginSuccess(result)))
      .catch(error => dispatch(loginFailed(error.message)));
  };
};

export const loginSuccess = result => {
  return dispatch => {
    dispatch({
      type: LOGIN_SUCCESS
    });
    dispatch(updateAppState(result));
  };
};

export const loginFailed = error => {
  return dispatch => {
    dispatch({
      type: LOGIN_FAILED,
      message: { type: "fail", text: error }
    });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT
    });

    fetch("/api/logout", {
      method: "POST",
      accept: "application/json",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Внутренняя ошибка сервера!");
      })
      .then(result => dispatch(logoutSuccess(result)))
      .catch(error => dispatch(logoutFailed(error.message)));
  };
};

export const logoutSuccess = result => {
  return dispatch => {
    dispatch({
      type: LOGOUT_SUCCESS
    });
    dispatch(updateAppState(result));
  };
};

export const logoutFailed = error => {
  return dispatch => {
    dispatch({
      type: LOGOUT_FAILED,
      message: { type: "fail", text: error }
    });
  };
};