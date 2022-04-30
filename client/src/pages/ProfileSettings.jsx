import React, { useEffect } from "react";
import { UserInfo, Avatar, Icon } from "@/components";
import { Divider, Button } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import { useStoreAndAuth } from "@/utils";

export default function ProfileSettings() {
  const { userStore } = useStoreAndAuth();
  const { logout, user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) userStore.getProfile();
    return () => {};
  }, [isAuthenticated]);

  return (
    <div className="white-container">
      <div className="maininfo">
        <div>
          <Avatar size={64} user={user} goToProfile />
        </div>
        <div style={{ fontSize: "18px" }}>USER NAME</div>
        <div>
          <Icon type="icon-edit" />
        </div>
      </div>
      <div>
        <UserInfo label="GENDER">MALE</UserInfo>
        <Divider />
        <UserInfo label="EMAIL">abc123@gmail.com</UserInfo>
        <Divider />
        <UserInfo label="OCCUPATION">student</UserInfo>
        <Divider />
        <UserInfo label="COMPANY">Northeastern University</UserInfo>
        <Divider />
        <UserInfo label="ABOUT">2021 fall</UserInfo>
      </div>
      <div className="logout-btn">
        <Button
          type="primary"
          shape="round"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          LOG OUT
        </Button>
      </div>
    </div>
  );
}
