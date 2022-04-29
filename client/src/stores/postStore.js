import { makeAutoObservable, flow } from "mobx";
import { postAPI } from "@/api";

class PostStore {
  constructor() {
    makeAutoObservable(this);
  }
}

const postStore = new PostStore();
export default postStore;
