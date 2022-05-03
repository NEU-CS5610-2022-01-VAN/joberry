import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { Profile } from "@/components";
import { useStoreAndAuth } from "@/utils";
import { useNavigate } from "react-router-dom";

const ProfilieDetail = observer(() => {
  const {userStore, accessToken} = useStoreAndAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) userStore.getProfile();
    return () => {};
  }, [accessToken]);

  const berryCallback = () => userStore.getProfile();

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
       {!userStore.loading ?  <Button
          type="primary"
          ghost
          size="large"
          shape="round"
          onClick={() => navigate("/profile/settings")}
        >
          Settings
        </Button> : ""}
      </div>
      <div>
        <Profile
          loading={userStore.loading}
          user={userStore.userProfile}
          activity={userStore.userProfile.activities}
          goToProfile
          berryCallback={berryCallback}
        />
      </div>
    </div>
  );
});

export default ProfilieDetail;
