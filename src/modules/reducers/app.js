import {
  GET_APPSTATE,
  GET_APPSTATE_SUCCESS,
  GET_APPSTATE_FAILED,
  UPDATE_APPSTATE,
  CHANGE_APP_LANGUAGE
} from "../constants";

const initialState = {
  fetching: false,
  appLoaded: false,
  loggedIn: false,
  user: {},
  language: 'ru',
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_APPSTATE:
      return {
        ...state,
        fetching: true
      };

    case GET_APPSTATE_SUCCESS:
      return {
        ...state,
        fetching: false,
        appLoaded: true,
        loggedIn: action.loggedIn,
        user: action.user,
        language: action.language, 
        error: {}
      };

    case GET_APPSTATE_FAILED:
      return {
        ...state,
        fetching: false,
        loggedIn: false,
        user: {},
        error: action.error
      };

    case UPDATE_APPSTATE:
      return {
        ...state,
        loggedIn: action.loggedIn,
        user: action.user,
        language: action.language
      };

    case CHANGE_APP_LANGUAGE:
      return {
        ...state,
        language: action.language
      };

    default:
      return state;
  }
};
