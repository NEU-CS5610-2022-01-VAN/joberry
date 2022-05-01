import React, { useEffect } from "react";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStoreAndAuth } from "@/utils";
import { Avatar, Icon } from "@/components";

export default function HeaderBar() {
  const navigate = useNavigate();
  const { userStore, accessToken, user } = useStoreAndAuth();
  useEffect(() => {
    if (accessToken) userStore.logInUser(user);
    return () => {};
  }, []);

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
          </div>
          <div>
            <Input
              placeholder="Search for posts"
              style={{ width: "20vw" }}
              className="mg-r-12 search-bar"
              suffix={<Icon type="icon-search" />}
              size="large"
            />
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={() => navigate("/posts/new")}
            >
              New Post
            </Button>
          </div>
        </div>
      </div>
      <div className="align-center">
        <h5 className="mg-r-12 mg-t-8 cursor-default">
          {userStore.currentUser.name || "Guest User"}
        </h5>

        <Avatar user={userStore.currentUser} goToProfile size="large" />
      </div>
    </div>
  );
}
