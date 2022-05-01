import { makeAutoObservable, flow } from "mobx";
import { commentAPI } from "@/api";
import { $success } from "@/components";

class CommentStore {
  loading = false;
  commentList = [];
  postId = null;

  constructor() {
    makeAutoObservable(this);
  }

  createNewComment = flow(function* (params) {
    this.loading = true;
    try {
      const data = yield commentAPI.createNewComment(params);
      if (data) {
        $success("Success");
      }
    } catch (error) {}
    this.loading = false;
  });

  deleteComment = flow(function* (id) {
    this.loading = true;
    try {
      const data = yield commentAPI.deleteComment(id);
      if (data) {
        $success("Success");
      }
    } catch (error) {}
    this.loading = false;
  });

  getCommentsOfPost = flow(function* (id) {
    this.loading = true;
    try {
      const data = yield commentAPI.getCommentsOfPost(id);
      if (data) {
        this.postId = id;
        this.commentList = data;
      }
    } catch (error) {}
    this.loading = false;
  });
}

const commentStore = new CommentStore();
export default commentStore;
