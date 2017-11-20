import {
  GET_CATEGORY_WORDS,
  GET_CATEGORY_WORDS_SUCCESS,
  GET_CATEGORY_WORDS_FAILED
} from "../constants";

const initialState = {
  fetching: false,
  data: {},
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_WORDS:
    return {
      ...state,
      fetching: true
    };

  case GET_CATEGORY_WORDS_SUCCESS:
    return {
      ...state,
      fetching: false,
      data: action.words,
      error: {}
    };

  case GET_CATEGORY_WORDS_FAILED:
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
