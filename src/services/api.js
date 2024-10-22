import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getUsers = () => api.get("/users");
export const addUser = (user) => api.post("/users", user);
export const updateUser = (id, updatedUser) =>
  api.put(`/users/${id}`, updatedUser);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const getPosts = () => api.get("/posts");
