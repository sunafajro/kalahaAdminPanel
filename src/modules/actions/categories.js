import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED
} from "../constants";

export const getCategories = () => {
  return dispatch => {
    dispatch({
      type: GET_CATEGORIES
    });

    fetch("/api/categories", {
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
      .then(categories => {
        dispatch(getCategoriesSuccess(categories));
      })
      .catch(error => {
        dispatch(getCategoriesFailed(error.message));
      });
  };
};

export const getCategoriesSuccess = (categories) => {
  return dispatch => {
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      categories
    });
  };
};

export const getCategoriesFailed = error => {
  return dispatch => {
    dispatch({
      type: GET_CATEGORIES_FAILED,
      error
    });
  };
};