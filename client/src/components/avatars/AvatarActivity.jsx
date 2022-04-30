import React from "react";
import { Avatar } from "@/components";

const AvatarActivity = ({ activity, reverse }) => {
  const { user, action, time } = activity;

  return (
    <div className="avatar-activity">
      <Avatar className="mg-r-12" user={user} size="small" showName />
      <div className="color-base-60 mg-r-8">
        {reverse ? `${action} on` : `${time} • `}
      </div>
      <div className="color-base-60 mg-r-8">{reverse ? time : action}</div>
    </div>
  );
};

export default AvatarActivity;
