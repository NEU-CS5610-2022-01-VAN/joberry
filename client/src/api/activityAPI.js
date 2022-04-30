import axios from "axios";

const activityAPI = {
  createNewBerry(params) {
    return axios.post("/activities/berries", params);
  },
  deleteBerry(params) {
    return axios.delete("/activities/berries", params);
  },
  createNewComment(params) {
    return axios.post("/activities/comments", params);
  },
  deleteComment(id) {
    return axios.delete(`/activities/comments/${id}`);
  },
};

export default activityAPI;
