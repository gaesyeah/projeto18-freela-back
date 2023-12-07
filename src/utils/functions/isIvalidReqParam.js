export const isInvalidReqParam = (param) => {
  return !param || isNaN(param) || param < 1;
};
