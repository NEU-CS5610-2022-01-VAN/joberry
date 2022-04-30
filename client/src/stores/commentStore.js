import { makeAutoObservable, flow } from "mobx";
import { activityAPI } from "@/api";

class CommentStore {
  loading = false;
  commentDetail = []

  constructor() {
    makeAutoObservable(this);
  }

  createNewComment = flow(function* (params) {
    this.loading = true;
    try {
      const data = yield activityAPI.createNewComment(params);
      if (data) this.commentList = data;
    } catch (error) {}
    this.loading = false;
  });

  deleteComment = flow(function* (id) {
    this.loading = true;
    try {
      const data = yield activityAPI.deleteComment(id);
    //   if (data) this.postDetail = emptyPost;
    } catch (error) {}
    this.loading = false;
  });
}

const commentStore = new CommentStore();
export default commentStore;
