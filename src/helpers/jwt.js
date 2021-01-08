/**Get jwt token from local storage */
export const getJwt = () => {
  return localStorage.getItem("JWT");
};
/**remove a key from local storage */
export const removeFromLocal = (item) => {
  return localStorage.removeItem(item);
};
/**get item from local storage */
export const getFromLocal = (item) => {
  return localStorage.getItem(item);
};
