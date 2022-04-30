import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Button } from "antd";
import { Profile } from "@/components";
import { useStoreAndAuth } from "@/utils";
import { useNavigate } from "react-router-dom";

const user = {
  id: 1,
  name: "wcr",
  email: "wcrzrz@gmail.com",
  about: "Student @ Northeastern University\n I am an idiot as you might know.\n I wish I could be a Lannister."
};
const post = {
  id: 1,
  body: "awiefuyaw",
  title: "awefcaw",
};
const activity = [{ id: 1, user, post, type: 1 }];

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
      <div>
        <Profile user={userProfile} activity={activity} goToProfile />
      </div>
      <div style={{float:"right", position:"absolute", top:"11vh", right:"1vw"}}>
        <Button type="primary" ghost size="large" shape="round" onClick={()=>navigate("/profile/settings")}>
          Edit Profile
        </Button>
      </div>
    </div>
  );
});

export default ProfilieDetail;
