import axios from "axios";
import { Message } from "element-ui";
import router from "@/router";

axios.interceptors.request.use(config => {
  const newConfig = { ...config };

  if (localStorage.getItem("token")) {
    newConfig.headers["x-access-token"] = localStorage.getItem("token");
  }

  return newConfig;
});

const request = async (method, url, options = {}) => {
  try {
    const { data, status, headers } = await axios({
      method,
      url,
      headers: { "Content-Type": "application/json" },
      ...options
    });

    return {
      data,
      status,
      headers
    };
  } catch (error) {
    console.log(error);

    /* eslint-disable camelcase */
    const { error_message } = error.response.data;
    const message = error_message || "未知錯誤";
    Message.error({ message });

    const { status } = error.response;
    if (status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
    }

    return { status };
  }
};

export default request;
