import React from "react";
import { AvatarActivity, PostItem } from "@/components";

const ActivityRecord = (props) => {
  const { activity, post } = props;
  return (
    <div>
      <AvatarActivity activity={activity} />
      <PostItem post={post} />
    </div>
  );
};

export default ActivityRecord;
