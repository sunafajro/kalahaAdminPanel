import {
  GET_CATEGORY_WORDS,
  GET_CATEGORY_WORDS_SUCCESS,
  GET_CATEGORY_WORDS_FAILED
} from "../constants";

export const getCategoryWords = category => {
  return dispatch => {
    dispatch({
      type: GET_CATEGORY_WORDS
    });
    const body = JSON.stringify({ category });
    fetch("/api/words", {
      method: "POST",
      accept: "application/json",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Произошла ошибка!");
        }
        return response.json();
      })
      .then(words => {
        dispatch(getCategoryWordsSuccess(words));
      })
      .catch(error => {
        dispatch(getCategoryWordsFailed(error));
      });
  };
};

export const getCategoryWordsSuccess = words => {
  return dispatch => {
    dispatch({
      type: GET_CATEGORY_WORDS_SUCCESS,
      words
    });
  };
};

export const getCategoryWordsFailed = error => {
  return dispatch => {
    dispatch({
      type: GET_CATEGORY_WORDS_FAILED,
      error
    });
  };
};
