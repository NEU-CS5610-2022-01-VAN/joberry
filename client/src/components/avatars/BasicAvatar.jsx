import React from "react";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useStoreAndAuth } from "@/utils";

const BasicAvatar = observer((props) => {
  const { user, className, showName,  ...otherProps } = props;
  const navigate = useNavigate();
  const { userStore } = useStoreAndAuth();
  const gotoUser = () => {
    if (user.id === userStore.currentUser.id) {
      navigate("/profile");
    } else {
      navigate(`/users/${user.id}`);
    }
  };
  return (
    <div
      className={`cursor-pointer align-center ${className}`}
      onClick={gotoUser}
    >
      <Avatar className="mg-r-8" src={user?.picture} {...otherProps}>
        {user.picture ? "" : user.name && user?.name[0]}
      </Avatar>
      {showName ? user.name : ""}
    </div>
  );
});

export default BasicAvatar;
