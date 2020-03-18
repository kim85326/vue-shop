import request from "../utils/request";

export const getUserListApi = params => {
  return request({
    method: "get",
    url: "/users",
    params
  });
};

export const setUserEnabledApi = (id, isEnabled) => {
  return request({
    method: isEnabled === true ? "put" : "delete",
    url: `/users/${id}/enabled`
  });
};
