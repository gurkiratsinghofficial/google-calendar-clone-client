export const capitalize = (string) => {
  /**returns captitalized string */
  if(string)
    return string.charAt(0).toUpperCase() + string.slice(1);
  return ''  
};
