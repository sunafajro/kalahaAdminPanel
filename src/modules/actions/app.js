import {
  GET_APPSTATE,
  GET_APPSTATE_SUCCESS,
  GET_APPSTATE_FAILED,
  UPDATE_APPSTATE
} from "../constants";

export const getState = category => {
  return dispatch => {
    dispatch({
      type: GET_APPSTATE
    });
    fetch("/api/state", {
      method: "POST",
      accept: "application/json",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Произошла ошибка!");
        }
        return response.json();
      })
      .then(state => {
        dispatch(getStateSuccess(state));
      })
      .catch(error => {
        dispatch(getStateFailed(error));
      });
  };
};

export const getStateSuccess = state => {
  return dispatch => {
    dispatch({
      type: GET_APPSTATE_SUCCESS,
      loggedIn: state.loggedIn,
      user: state.user,
      language: state.language
    });
  };
};

export const getStateFailed = error => {
  return dispatch => {
    dispatch({
      type: GET_APPSTATE_FAILED,
      error
    });
  };
};

export const updateAppState = newState => {
  return dispatch => {
    dispatch({
      type: UPDATE_APPSTATE,
      loggedIn: newState.loggedIn,
      user: newState.user,
      language: newState.language
    });
  };
};
