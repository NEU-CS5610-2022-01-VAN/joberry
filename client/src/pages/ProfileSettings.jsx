import React, { useEffect } from "react";
import { ProfileTerm, Avatar, $success } from "@/components";
import { Button, Popconfirm } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import { useStoreAndAuth } from "@/utils";
const infoItems = ["gender", "email", "occupation", "company", "about"];

export default function ProfileSettings() {
  const { userStore, accessToken } = useStoreAndAuth();
  const { logout, user } = useAuth0();
  useEffect(() => {
    if (accessToken) userStore.getProfile();
    return () => {};
  }, [accessToken]);
  const confirmLogout = () => {
    logout({ returnTo: window.location.origin })
    setTimeout(() => $success("Logged Out!"), 1000);
  }
  return (
    <div className="white-container" style={{ minHeight: "88vh" }}>
      <div
        className="align-center"
        style={{ marginLeft: "4vw", marginTop: "5vh" }}
      >
        <div className="mg-r-40">
          <Avatar size={80} user={user} goToProfile />
        </div>
        <h4 className="mg-r-24">{user?.name}</h4>
      </div>
      <div style={{ marginLeft: "10vw" }}>
        {infoItems.map((term, idx) => (
          <ProfileTerm term={term} key={idx} />
        ))}
        <Popconfirm
          title="Are you sure you want to log out?"
          onConfirm={confirmLogout}
          okText="Yes"
          cancelText="No"
        >
          <Button
            style={{ marginTop: "8vh", marginLeft: "-0.4vw" }}
            type="primary"
            shape="round"
          >
            LOG OUT
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
}
