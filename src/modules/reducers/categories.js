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
  fetchingCategories: false,
  fetchingWords: false,
  activeCategory: {},
  categories: {},
  words: {},
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        fetchingCategories: true
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        fetchingCategories: false,
        activeCategory: action.activeCategory,
        categories: action.categories,
        error: {}
      };

    case GET_CATEGORIES_FAILED:
      return {
        ...state,
        fetchingCategories: false,
        activeCategory: {},
        categories: {},
        error: action.error
      };

      case GET_CATEGORY_WORDS:
      return {
        ...state,
        fetchingWords: true
      };

    case GET_CATEGORY_WORDS_SUCCESS:
      return {
        ...state,
        fetchingCategories: false,
        fetchingWords: false,
        words: action.words,
        error: {}
      };

    case GET_CATEGORY_WORDS_FAILED:
      return {
        ...state,
        fetchingCategories: false,
        fetchingWords: false,
        words: {},
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
