export const setToken = (token) => {
  localStorage.setItem("clinic_token", token);
}

export const getToken = () => {
 return localStorage.getItem("clinic_token");
}

export const clearToken = () => {
  localStorage.removeItem("clinic_token");
}