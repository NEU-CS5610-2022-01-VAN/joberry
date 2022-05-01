import React, { useEffect } from "react";
import { useStoreAndAuth } from "@/utils";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { observer } from "mobx-react";
import { autorun } from "mobx";

const VerifyUser = observer(() => {
  const navigate = useNavigate();
  const { accessToken } = useStoreAndAuth();
  const { userStore } = useStoreAndAuth();

  useEffect(() => {
    if (accessToken) userStore.verifyUser();
  }, [accessToken]);

  useEffect(() => {
    autorun(() => {
      if (userStore.userProfile.auth0Id) navigate("/home");
    });
  }, []);

  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
});
export default VerifyUser;
