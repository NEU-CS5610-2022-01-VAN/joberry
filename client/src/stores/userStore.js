import { makeAutoObservable, flow } from "mobx";
import { userAPI } from "@/api";

class UserStore {
  loading = false;
  currentUser = {};
  otherUser = {};

  constructor() {
    makeAutoObservable(this);
  }

  verifyUser = flow(function* () {
    this.loading = true;
    try {
      const data = yield userAPI.verifyUser();
      if (data) {
        this.currentUser = data;
      }
    } catch (error) {}
    this.loading = false;
  });

  getProfile = flow(function* () {
    this.loading = true;
    try {
      const data = yield userAPI.getProfile();
      if (data) {
        this.currentUser = data;
      }
    } catch (error) {}
    this.loading = false;
  });

  getUserInfo = flow(function* (id) {
    this.loading = true;
    try {
      const data = yield userAPI.getProfile();
      if (data) {
        this.otherUser = data;
      }
    } catch (error) {}
    this.loading = false;
  });

  updateProfile = flow(function* (params) {
    this.loading = true;
    try {
      const data = yield userAPI.updateProfile(params);
      if (data) {
        this.currentUser = data;
      }
    } catch (error) {}
    this.loading = false;
  });

  deleteAccount = flow(function* () {
    this.loading = true;
    try {
      const data = yield userAPI.deleteAccount();
      if (data) {
        this.currentUser = data;
      }
    } catch (error) {}
    this.loading = false;
  });
}
const userStore = new UserStore();
export default userStore;
