import axios from "axios";

const userAPI = {
  verifyUser() {
    return axios.post("/users/verify-user");
  },
  getProfile() {
    return axios.get("/users/profile");
  },
  getUserDetail(id) {
    return axios.get(`/users/${id}`);
  },
  updateProfile(params) {
    return axios.put("/users/profile", params);
  },
  deleteAccount() {
    return axios.delete("/users/account");
  },
};

export default userAPI;
