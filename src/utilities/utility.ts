export const getAuthStatus = function () {
  return localStorage.getItem("authToken");
};

export const setAuthToken = function (token: string) {
  localStorage.setItem("authToken", token);
};

export const removeAuthToken = function () {
  localStorage.removeItem("authToken");
};
