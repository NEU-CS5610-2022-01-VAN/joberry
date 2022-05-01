import React from "react";
import { AvatarActivity, PostItem } from "@/components";

const ActivityRecord = (props) => {
  const { activity, berryCallback} = props;
  return (
    <>
      <AvatarActivity activity={activity} />
      <PostItem post={activity.post} berryCallback={berryCallback}/>
    </>
  );
};

export default ActivityRecord;
