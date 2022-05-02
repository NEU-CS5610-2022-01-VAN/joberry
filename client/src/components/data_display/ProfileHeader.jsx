import React from "react";
import { Avatar, Loading } from "@/components";

const ProfileHeader = ({ user, goToProfile, loading }) => {
  return (
    <div
      className="white-container space-between  profile-header"
      style={{ width: "100%", minHeight: "18vh" }}
    >
      {loading ? (
        <Loading className="small-loading" />
      ) : (
        <div className="align-center">
          <Avatar
            size={80}
            user={user}
            className="mg-r-12"
            goToProfile={goToProfile}
          ></Avatar>
          <div
            style={{ minHeight: "5vh", lineHeight: "1.1" }}
            className="color-base-60 fz-14"
          >
            <h4>{user?.name}</h4>
            <p>{user?.email}</p>
            <p>{user?.company}</p>
            <p>{user?.occupation}</p>
            <p>{user?.about}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
