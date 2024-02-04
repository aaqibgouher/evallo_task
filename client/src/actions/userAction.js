import {
  addContentApi,
  addFeedbackApi,
  approveContentApi,
  deleteContentApi,
  editContentApi,
  getContentByIdApi,
  getContentsApi,
  getDashboardContentsApi,
  getMeApi,
  loginApi,
  logoutApi,
  registerApi,
} from "../api/userApi";
import {
  GET_CONTENT,
  GET_CONTENTS,
  GET_ME,
  SET_DIALOG,
  SET_SNACKBAR,
  SET_TOKEN,
} from "../types";

export const registerAction = (payload) => async (dispatch) => {
  try {
    const res = await registerApi(payload);

    console.log(res, "from register action res");
    if (!res || res.status !== 200) throw res.error;

    // show success message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    return res;
  } catch (error) {
    console.log(error, "register action error");
    // show snackbar
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const loginAction = (payload) => async (dispatch) => {
  try {
    const res = await loginApi(payload);

    if (!res || res.status !== 200) throw res.error;

    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   set token to state & localstoray
    dispatch({ type: SET_TOKEN, payload: res.data.token });

    // save token to local storage
    localStorage.setItem("token", res.data.token);

    return res;
  } catch (error) {
    console.log(error, "from auth actions -> login user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    const res = await logoutApi();

    if (!res || res.status !== 200) throw res.error;

    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   remove token from state
    dispatch({ type: SET_TOKEN, payload: null });

    // save token to local storage
    localStorage.removeItem("token");

    // setting me to null
    dispatch({ type: GET_ME, payload: null });

    return res;
  } catch (error) {
    console.log(error, "from logout user action");
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: error },
    });
  }
};

export const getMeAction = () => async (dispatch) => {
  try {
    const res = await getMeApi();

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // update me state
    dispatch({ type: GET_ME, payload: res.data });
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const getDashboardContentsAction = () => async (dispatch) => {
  try {
    const res = await getDashboardContentsApi();

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // update me state
    dispatch({ type: GET_CONTENTS, payload: res.data });
  } catch (error) {
    console.log(error, "from get dashboard action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const getContentsAction = (payload) => async (dispatch) => {
  try {
    const res = await getContentsApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // update me state
    dispatch({ type: GET_CONTENTS, payload: res.data });
  } catch (error) {
    console.log(error, "from get dashboard action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const addContentAction = (payload) => async (dispatch) => {
  try {
    const res = await addContentApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    return res;
  } catch (error) {
    console.log(error, "from get dashboard action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const approveContentAction = (payload) => async (dispatch) => {
  try {
    const res = await approveContentApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   refresh contents
    await dispatch(getContentsAction(payload));
  } catch (error) {
    console.log(error, "from get dashboard action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const getContentByIdAction = (payload) => async (dispatch) => {
  try {
    const res = await getContentByIdApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // update me state
    dispatch({ type: GET_CONTENT, payload: res.data });
  } catch (error) {
    console.log(error, "from get dashboard action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const addFeedbackAction = (payload) => async (dispatch) => {
  try {
    const res = await addFeedbackApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   close dialog
    await dispatch({
      type: SET_DIALOG,
      payload: null,
    });

    // update me state
    await dispatch(getContentByIdAction(payload));
  } catch (error) {
    console.log(error, "from get dashboard action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const deleteContentAction = (payload) => async (dispatch) => {
  try {
    console.log(1);
    const res = await deleteContentApi(payload);
    console.log(2);
    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // update me state
    await dispatch(getContentsAction(payload));
  } catch (error) {
    console.log(error, "from get dashboard action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const editContentAction = (contentId, payload) => async (dispatch) => {
  try {
    const res = await editContentApi(contentId, payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    return res;
  } catch (error) {
    console.log(error, "from get dashboard action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};
