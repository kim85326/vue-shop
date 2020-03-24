import request from "../utils/request";

const getRolesSummariesApi = params => {
  return request({
    method: "get",
    url: "/roles/summaries",
    params
  });
};

export default getRolesSummariesApi;
