import httpStatus from "http-status";

const unprocessableEntity = (resource = "Unprocessable entity") => {
  return {
    status: httpStatus.UNPROCESSABLE_ENTITY,
    message: resource,
  };
};

const unauthorized = (resource = "Unauthorized") => {
  return {
    status: httpStatus.UNAUTHORIZED,
    message: resource,
  };
};

const notFound = (resource = "Not found") => {
  return {
    status: httpStatus.NOT_FOUND,
    message: resource,
  };
};

export const error = { unprocessableEntity, unauthorized, notFound };
