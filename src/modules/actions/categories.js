import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  UPDATE_ACTIVE_CATEGORY
} from "../constants";
import { getCategoryWords } from './words'; 

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
        let key;
        let activeCategory = {};
        if (Object.keys(categories).length) {
          key = Object.keys(categories)[0];
          activeCategory = categories[key];
          activeCategory.name = key;
        }
        dispatch(getCategoriesSuccess(categories, activeCategory));
      })
      .catch(error => {
        dispatch(getCategoriesFailed(error.message));
      });
  };
};

export const getCategoriesSuccess = (categories, activeCategory) => {
  return dispatch => {
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      activeCategory,
      categories
    });
    if (activeCategory && activeCategory.name) {
      dispatch(getCategoryWords(activeCategory.name));
    }
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

export const updateActiveCategory = category => {
  return dispatch => {
    dispatch({
      type: UPDATE_ACTIVE_CATEGORY,
      category
    });
  };
}