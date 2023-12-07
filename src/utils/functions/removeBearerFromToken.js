export const removeBearerFromToken = (token) => {
  return token?.replace("Bearer ", "");
};
