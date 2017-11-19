import {
  GET_ALL_WORDS,
  GET_ALL_WORDS_SUCCESS,
  GET_ALL_WORDS_FAILED
} from "../constants";

const initialState = {
  fetching: false,
  words: {},
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_WORDS:
      return {
        ...state,
        fetching: true
      };

    case GET_ALL_WORDS_SUCCESS:
      return {
        ...state,
        fetching: false,
        words: action.words,
        error: {}
      };

    case GET_ALL_WORDS_FAILED:
      return {
        ...state,
        fetching: false,
        words: {},
        error: action.error
      };

    default:
      return state;
  }
};
