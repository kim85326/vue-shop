import axios from "axios";
import { Message } from "element-ui";

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

    return {};
  }
};

export default request;
