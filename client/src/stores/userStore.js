import { makeAutoObservable, flow } from "mobx";
import { userAPI } from "@/api";
import { $success, $error } from "@/components";
const nullUser = {
  name: null,
  email: null,
  id: null,
  auth0Id: null,
  picture: "",
};
const nullProfile = {
  ...nullUser,
  company: null,
  about: null,
  gender: null,
  occupation: null,
  posts: null,
  berries: null,
  comments: null,
};

class UserStore {
  loading = false;
  loggedIn = false;
  currentUser = nullUser;
  userProfile = nullProfile;
  otherUserDetail = {};

  constructor() {
    makeAutoObservable(this);
  }

  updateProfileTerm(key, value) {
    this.userProfile[key] = value;
  }

  logInUser(user) {
    this.loggedIn = true;
    this.currentUser = user;
  }

  logOut() {
    this.loggedIn = false;
    this.currentUser = nullUser;
  }

  verifyUser = flow(function* () {
    this.loading = true;
    try {
      const data = yield userAPI.verifyUser();
      if (data) {
        this.currentUser = data;
        this.loggedIn = true;
      }
    } catch (error) {}
    this.loading = false;
  });

  getProfile = flow(function* () {
    this.loading = true;
    try {
      const data = yield userAPI.getProfile();
      if (data) {
        this.userProfile = data;
      }
    } catch (error) {}
    this.loading = false;
  });

  getUserDetail = flow(function* (id) {
    this.loading = true;
    try {
      const data = yield userAPI.getUserDetail();
      if (data) {
        this.otherUserDetail = data;
      }
    } catch (error) {}
    this.loading = false;
  });

  updateProfile = flow(function* () {
    this.loading = true;
    const { gender, occupation, company, about } = this.userProfile;
    try {
      const data = yield userAPI.updateProfile({
        gender,
        occupation,
        company,
        about,
      });
      if (data) {
        this.userProfile = data;
        $success("Profile updated!");
      }
    } catch (error) {
      $error("Something happened, please try again later!");
    }
    this.loading = false;
  });

  deleteAccount = flow(function* () {
    this.loading = true;
    try {
      const data = yield userAPI.deleteAccount();
      if (data) {
        this.currentUser = nullUser;
        this.userProfile = nullProfile;
      }
    } catch (error) {}
    this.loading = false;
  });
}
const userStore = new UserStore();
export default userStore;
