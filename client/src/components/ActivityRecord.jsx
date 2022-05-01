import React from "react";
import { AvatarActivity, PostItem } from "@/components";

const ActivityRecord = (props) => {
  const { activity} = props;
  return (
    <>
      <AvatarActivity activity={activity} />
      <PostItem post={activity.post} />
    </>
  );
};

export default ActivityRecord;
