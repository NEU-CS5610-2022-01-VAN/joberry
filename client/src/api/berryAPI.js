import axios from "axios";

const berryAPI = {
    createNewBerry(params) {
        return axios.post("/berries", params);
      },
      deleteBerry(params) {
        return axios.delete("/berries", params);
      },
};

export default berryAPI;