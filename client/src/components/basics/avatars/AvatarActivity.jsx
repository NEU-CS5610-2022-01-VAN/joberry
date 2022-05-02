import React from "react";
import { Avatar } from "@/components";
import moment from 'moment'
const AvatarActivity = ({ activity, reverse }) => {
  let { user, action, time } = activity;
  time = moment(time).format("MM/DD/YYYY hh:ss")
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
