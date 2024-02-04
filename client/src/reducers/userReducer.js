import { GET_CONTENT, GET_CONTENTS, GET_ME, SET_TOKEN } from "../types";

const initialState = {
  me: null,
  token: null,
  contents: [],
  categories: [
    { label: "Practice Tests", value: "PRACTICE_TESTS" },
    { label: "Worksheets", value: "WORKSHEETS" },
    { label: "Workbooks", value: "WORKBOOKS" },
    { label: "Question Banks", value: "QUESTION_BANKS" },
    { label: "Drills", value: "DRILLS" },
  ],
  status: [
    { label: "Draft", value: "DRAFT" },
    { label: "Publish", value: "PUBLISHED" },
  ],
  content: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case GET_ME:
      return {
        ...state,
        me: action.payload,
      };
    case GET_CONTENTS:
      return {
        ...state,
        contents: action.payload,
      };
    case GET_CONTENT:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
