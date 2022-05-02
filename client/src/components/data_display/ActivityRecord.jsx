import React from "react";
import { AvatarActivity, PostItem } from "@/components";

const ActivityRecord = (props) => {
  const { activity, berryCallback } = props;
  return (
    <div className="mg-t-24">
      <AvatarActivity activity={activity} />
      <PostItem post={activity.post} berryCallback={berryCallback} />
    </div>
  );
};

export default ActivityRecord;
