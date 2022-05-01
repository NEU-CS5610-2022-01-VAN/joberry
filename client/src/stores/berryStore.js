import { makeAutoObservable, flow } from "mobx";
import { berryAPI } from "@/api";
import { $success } from "@/components";

class BerryStore {
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  createNewBerry = flow(function* (params) {
    this.loading = true;
    try {
      const data = yield berryAPI.createNewBerry(params);
      if (data) {
        $success("Success");
      }
    } catch (error) {}
    this.loading = false;
  });

  deleteBerry = flow(function* (params) {
    this.loading = true;
    try {
      const data = yield berryAPI.deleteBerry(params);
      if (data) {
        $success("Success");
      }
    } catch (error) {}
    this.loading = false;
  });
}

const commentStore = new BerryStore();
export default commentStore;
