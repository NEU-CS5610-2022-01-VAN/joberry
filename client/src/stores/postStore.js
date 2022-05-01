import { makeAutoObservable, flow } from "mobx";
import { postAPI } from "@/api";
import { $success } from "@/components";
import { commentStore } from "@/stores";

const emptyPost = {
  body: null,
  title: null,
  _count: {
    berries: 0,
    comments: 0,
  },
  author: {
    name: null,
  },
  comments: [],
  berries:[]
};

class PostStore {
  loading = false;
  postList = [];
  postDetail = emptyPost;

  constructor() {
    makeAutoObservable(this);
  }

  getAllPosts = flow(function* () {
    this.loading = true;
    try {
      const data = yield postAPI.getAllPosts();
      if (data) this.postList = data;
    } catch (error) {}
    this.loading = false;
  });

  getPostDetail = flow(function* (id) {
    this.loading = true;
    try {
      const data = yield postAPI.getPostDetail(id);
      if (data) {
        this.postDetail = data;
        commentStore.commentList = data.comments;
        commentStore.postId = id;
      }
    } catch (error) {}
    this.loading = false;
  });

  searchPost = flow(function* (params) {
    this.loading = true;
    try {
      const data = yield postAPI.searchPost(params);
      if (data) this.postList = data;
    } catch (error) {}
    this.loading = false;
  });

  createNewPost = flow(function* (params) {
    this.loading = true;
    try {
      const data = yield postAPI.createNewPost(params);
      if (data) {
        this.postDetail = data;
         $success('New post created!');
      }
    } catch (error) {}
    this.loading = false;
  });

  updatePost = flow(function* (params) {
    this.loading = true;
    try {
      const data = yield postAPI.updatePost(params);
      if (data) {
        this.postDetail = data;
        $success("Post updated!");
      }
    } catch (error) {}
    this.loading = false;
  });

  deletePost = flow(function* (id) {
    this.loading = true;
    try {
      const data = yield postAPI.deletePost(id);
      if (data) this.postDetail = emptyPost;
    } catch (error) {}
    this.loading = false;
  });
}

const postStore = new PostStore();
export default postStore;
