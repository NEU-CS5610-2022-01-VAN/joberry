import React from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

export default function HeaderBar() {
  const { logout } = useAuth0();

  return (
    <div className="header-bar">
      <img
        className="mg-r-20"
        height="25vh"
        src="/images/Joberry.png"
        alt="joberry"
      />
      <div className="header-nav">
        <Link className="mg-r-20" to="/home">
          HOME
        </Link>
        <Link className="mg-r-20" to="/discover">
          DISCOVER
        </Link>
        <Link className="mg-r-20" to="/profile">
          PROFILE
        </Link>
        <Button
          className="exit-button"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          LogOut
        </Button>
      </div>
    </div>
  );
}
