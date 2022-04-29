import axios from "axios";

const activityAPI = {
  getBerriesOfPost(params) {
    return axios.get("/activities/berries", params);
  },
  createNewBerry(params) {
    return axios.post("/activities/berries", params);
  },
  deleteBerry(params) {
    return axios.delete("/activities/berries", params);
  },
  getCommentsOfPost(params) {
    return axios.get("/activities/comments", params);
  },
  createNewComment(params) {
    return axios.post("/activities/comments", params);
  },
  deleteComment(id) {
    return axios.delete(`/activities/comments/${id}`);
  },
};

export default activityAPI;
