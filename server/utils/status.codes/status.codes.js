const INVALID_STATUS_CODE = code => `${code} does not exist!`;

const statusCodes = {
  ok: 200,
  created: 201,

  movedPermanently: 301,
  found: 302,
  notModified: 304,

  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
};

const getStatusCode = (statusCodeName) => {
  if (statusCodes[statusCodeName]) {
    return statusCodes[statusCodeName];
  }

  throw new Error(INVALID_STATUS_CODE(statusCodeName));
};


module.exports = { getStatusCode };
