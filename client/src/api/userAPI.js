import axios from "axios";

const userAPI = {
    verifyUser(params) {
        return axios.post("/users/verify-user", params);
    },
    getProfile() {
        return axios.get("/users/profile");
    },
    getUserInfo(id) {
        return axios.get(`/users/${id}, id`);
    }
};

export default userAPI;
