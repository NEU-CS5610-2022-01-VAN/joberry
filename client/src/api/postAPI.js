import axios from "axios";

const postAPI = {
  getAllPosts() {
    return axios.get("/posts");
  },
  getHotCommentPosts(params) {
    return axios.post("/discover/hot", params);
  },
  getHotBerryPosts(params) {
    return axios.post("/discover/most-berries", params);
  },
  getPostDetail(id) {
    return axios.get(`/posts/${id}`);
  },
  searchPost(params) {
    return axios.post("/posts/search", params);
  },
  createNewPost(params) {
    return axios.post("/posts", params);
  },
  updatePost(params) {
    const { id, ...others } = params;
    return axios.put(`/posts/${id}`, others);
  },
  deletePost(id) {
    return axios.delete(`/posts/${id}`);
  },
};

export default postAPI;
