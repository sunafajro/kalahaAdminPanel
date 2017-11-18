import { UPDATE_QUIZ_STATE } from "../constants";

export const CLASSLIST_DEFAULT = "card bg-light text-center";
export const CLASSLIST_CORRECT = "card text-white bg-success text-center";
export const CLASSLIST_INCORRECT = "card text-white bg-danger text-center";
export const CLASSLIST = {
  1: CLASSLIST_DEFAULT,
  2: CLASSLIST_DEFAULT,
  3: CLASSLIST_DEFAULT,
  4: CLASSLIST_DEFAULT
};

const initialState = {
  start: false,
  active: false,
  totalCount: 0,
  correctId: null,
  word: null,
  words: {},
  responses: {},
  classList: CLASSLIST
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_QUIZ_STATE:
      return {
        ...state,
        ...action.newState
      };
    default:
      return state;
  }
};
