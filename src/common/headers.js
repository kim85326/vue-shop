const getPaginationFromHeaders = headers => {
  return {
    currentPage: Number(headers["x-page"]),
    pageSize: Number(headers["x-page-size"]),
    total: Number(headers["x-total"])
  };
};

export default getPaginationFromHeaders;
