import React from "react";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import {Icon} from '@/components'
const BasicAvatar = (props) => {
  const { user, className, showName, goToProfile,  ...otherProps } = props;
  const navigate = useNavigate();
  const gotoUser = () => {
    if (goToProfile) navigate('/profile');
    else navigate(`/users/${user.id}`);
  };
  
  return (
    <div
      className={`cursor-pointer align-center ${className}`}
      onClick={gotoUser}
    >
      {!user.id ? (
        <Avatar icon={<Icon type="icon-user" />} {...otherProps} />
      ) : (
        <Avatar className="mg-r-8" src={user?.picture} {...otherProps}>
          {user.picture ? "" : user.name && user?.name[0]}
        </Avatar>
      )}
      {showName ? user.name : ""}
    </div>
  );
};

export default BasicAvatar;
