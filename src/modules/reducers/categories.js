import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  UPDATE_ACTIVE_CATEGORY
} from "../constants";

const initialState = {
  fetching: false,
  activeCategory: {},
  categories: {},
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
        activeCategory: action.activeCategory,
        categories: action.categories,
        error: {}
      };

    case GET_CATEGORIES_FAILED:
      return {
        ...state,
        fetching: false,
        activeCategory: {},
        categories: {},
        error: action.error
      };

    case UPDATE_ACTIVE_CATEGORY:
      let activeCategory = { ...state.categories[action.category] }
      activeCategory.name = action.category;
      return {
        ...state,
        activeCategory
      };

    default:
      return state;
  }
};
