import React from "react";
import { Avatar } from "@/components";

const ProfileHeader = ({ user, goToProfile }) => {
  return (
    <div
      className="white-container space-between"
      style={{ width: "100%", minHeight: "18vh" }}
    >
      <div className="align-center">
        <Avatar
          size={80}
          user={user}
          className="mg-r-12"
          goToProfile={goToProfile}
        ></Avatar>
        <div style={{ minHeight: "5vh" }}>
          <h4>{user?.name}</h4>
          <p>{user?.email}</p>
          <p>{user?.company}</p>
          <div className="color-base-60 fz-14">{user.about}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
