import { UPDATE_QUIZ_STATE } from "../constants";

export const updateQuizState = newState => {
  return dispatch => {
    dispatch({
      type: UPDATE_QUIZ_STATE,
      newState
    });
  };
};
