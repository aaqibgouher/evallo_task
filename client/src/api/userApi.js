import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const registerApi = async (payload) => {
  try {
    const res = await apiService.post("/auth/register", payload);
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from register api");
    throw error.response;
  }
};

export const loginApi = async (payload) => {
  try {
    const res = await apiService.post("/auth/login", payload);
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from login api");
    throw error.response;
  }
};

export const logoutApi = async () => {
  try {
    const res = await apiService.get("/auth/logout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from logout api");
    throw error.response;
  }
};

export const getMeApi = async () => {
  try {
    console.log("from get me api");
    const res = await apiService.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const getDashboardContentsApi = async () => {
  try {
    console.log("from get me api");
    const res = await apiService.get("/creator/dashboard", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const getContentsApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.get(`/creator/${payload.creatorId}/content`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const addContentApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.post(`/creator`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const approveContentApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.get(`/creator/${payload.contentId}/approve`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const getContentByIdApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.get(`/creator/content/${payload.contentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};
