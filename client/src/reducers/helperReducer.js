import { SET_SNACKBAR } from "../types";

const initialState = {
  snackbar: null,
};

const helperReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      };
    default:
      return state;
  }
};

export default helperReducer;
