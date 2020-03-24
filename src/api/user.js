import request from "../utils/request";

export const getUserListApi = params => {
  return request({
    method: "get",
    url: "/users",
    params
  });
};

export const addUserApi = ({ username, name, email, password, remark }) => {
  return request({
    method: "post",
    url: "/users",
    data: {
      username,
      name,
      email,
      password,
      remark
    }
  });
};

export const updateUserApi = ({ id, username, name, email, password, isEnabled, remark }) => {
  return request({
    method: "patch",
    url: `/users/${id}`,
    data: {
      username,
      name,
      email,
      password,
      isEnabled,
      remark
    }
  });
};

export const setUserEnabledApi = (id, isEnabled) => {
  return request({
    method: isEnabled === true ? "put" : "delete",
    url: `/users/${id}/enabled`
  });
};

export const deleteUserApi = id => {
  return request({
    method: "delete",
    url: `/users/${id}`
  });
};
