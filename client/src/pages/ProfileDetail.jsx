import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { Profile } from "@/components";
import { useStoreAndAuth } from "@/utils";
import { useNavigate } from "react-router-dom";

const ProfilieDetail = observer(() => {
  const {userStore, accessToken} = useStoreAndAuth();
  const {userProfile} = userStore;
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) userStore.getProfile();
    return () => {};
  }, [accessToken]);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          float: "right",
          position: "absolute",
          top: "11vh",
          right: "1vw",
        }}
      >
        <Button
          type="primary"
          ghost
          size="large"
          shape="round"
          onClick={() => navigate("/profile/settings")}
        >
          Settings
        </Button>
      </div>
      <div>
        <Profile user={userProfile} activity={userProfile.activities} goToProfile />
      </div>
    </div>
  );
});

export default ProfilieDetail;
