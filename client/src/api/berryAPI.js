import axios from "axios";

const berryAPI = {
  createNewBerry(params) {
    return axios.post("/berries", params);
  },
  deleteBerry(id) {
    return axios.delete(`/berries/${id}`);
  },
};

export default berryAPI;
