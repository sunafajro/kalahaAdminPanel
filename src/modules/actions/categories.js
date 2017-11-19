import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  GET_CATEGORY_WORDS,
  GET_CATEGORY_WORDS_SUCCESS,
  GET_CATEGORY_WORDS_FAILED,
  UPDATE_ACTIVE_CATEGORY
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

export const getCategoryWords = (category) => {
  return dispatch => {
    dispatch({
      type: GET_CATEGORIES
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
        dispatch(getCategoryWordsFailed(error.message));
      });
  };
};

export const getCategoryWordsSuccess = (words) => {
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

export const updateActiveCategory = category => {
  return dispatch => {
    dispatch({
      type: UPDATE_ACTIVE_CATEGORY,
      category
    });
  };
}