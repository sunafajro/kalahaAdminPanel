import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  GET_CATEGORY_WORDS,
  GET_CATEGORY_WORDS_SUCCESS,
  GET_CATEGORY_WORDS_FAILED,
  UPDATE_ACTIVE_CATEGORY
} from "../constants";

const initialState = {
  fetching: false,
  data: {},
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        fetching: true
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        fetching: false,
        data: action.categories,
        error: {}
      };

    case GET_CATEGORIES_FAILED:
      return {
        ...state,
        fetching: false,
        data: {},
        error: action.error
      };

    default:
      return state;
  }
};
