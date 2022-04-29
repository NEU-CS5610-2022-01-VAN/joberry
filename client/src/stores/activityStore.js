import { makeAutoObservable, flow } from "mobx";
import { activityAPI } from "@/api";

class ActivityStore {
    constructor(){
        makeAutoObservable(this)
    }
}

const activityStore = new ActivityStore();
export default activityStore