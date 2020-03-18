import request from "../utils/request";

const getUserListApi = params => {
  return request({
    method: "get",
    url: "/users",
    params
  });
};

export default getUserListApi;
