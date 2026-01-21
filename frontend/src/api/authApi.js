import axiosInstance from "./axiosInstance"

export const loginApi = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", {
    email, 
    password,
  });
  return response.data; // {token, name, role }
};

export const getProfileApi = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data; // {name, role, email}
};

