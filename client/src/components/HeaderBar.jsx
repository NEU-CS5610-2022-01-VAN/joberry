import React from "react";
import { Avatar, Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {Icon} from '@/components'

export default function HeaderBar() {
  const { logout } = useAuth0();
  const navigate = useNavigate();

  return (
    <div className="header-bar">
      <div className="align-center">
        <img
          className="mg-r-40 cursor-pointer"
          height="25vh"
          src="/images/Joberry.png"
          alt="joberry"
          onClick={() => navigate("/home")}
        />
        <div className="header-nav">
          <div>
            <Link className="mg-r-32" to="/home">
              HOME
            </Link>
            <Link className="mg-r-32" to="/discover">
              DISCOVER
            </Link>
            <Link className="mg-r-32" to="/tags">
              TAGS
            </Link>
            <Button
              className="exit-button"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              LogOut
            </Button>
          </div>
          <div>
            <Input
              placeholder="Search for posts"
              style={{ width: "16vw" }}
              className="mg-r-12 search-bar"
              suffix={<Icon type="icon-search" />}
              size="large"
            />
            <Button type="primary" shape="round" size="large">
              New Post
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Avatar
          className="cursor-pointer"
          icon={<UserOutlined />}
          size="large"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
}
