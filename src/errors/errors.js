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

export const error = { unprocessableEntity, unauthorized };
