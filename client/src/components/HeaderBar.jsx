import React from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";


export default function HeaderBar() {
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
      </div>
    </div>
  );
}
