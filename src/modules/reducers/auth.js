import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  UPDATE_LOGIN_FORM
} from "../constants";

const DEFAULT_LOGIN_FORM = {
    username: "",
    password: "",
    valid: true
  };

const initialState = {
  fetching: false,
  loginForm: { ...DEFAULT_LOGIN_FORM },
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        fetching: true
      };

    case LOGIN_SUCCESS:
      let loginForm = { ...state.loginForm };
      loginForm.password = "";
      return {
        ...state,
        fetching: false,
        loginForm,
        error: {}
      };

    case LOGIN_FAILED:
      return {
        ...state,
        fetching: false,
        loginForm:  { ...DEFAULT_LOGIN_FORM },
        error: action.message
      };

    case LOGOUT:
      return {
        ...state,
        fetching: true
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        fetching: false,
        loginForm:  { ...DEFAULT_LOGIN_FORM },
        error: {}
      };

    case LOGOUT_FAILED:
      return {
        ...state,
        fetching: false,
        error: action.message
      };

    case UPDATE_LOGIN_FORM:
      return {
        ...state,
        loginForm: action.loginForm,
        error: {}
      };

    default:
      return state;
  }
};
