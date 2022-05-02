import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStoreAndAuth } from "@/utils";
import { Avatar, Searchbar } from "@/components";

export default function HeaderBar() {
  const navigate = useNavigate();
  const { userStore } = useStoreAndAuth();
  const usernameClick = () => {
    navigate("/" + userStore.user.name ? "profile" : "sign-in");
  };

  return (
    <div className="header-bar">
      <div className="align-center">
        <img
          className="mg-r-40 cursor-pointer joberry-logo"
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
            {/* <Link className="mg-r-32" to="/tags">
              TAGS
            </Link> */}
            <Link className="mg-r-32" to="/profile">
              PROFILE
            </Link>
            <Searchbar
              style={{ width: "15vw" }}
              className="mg-r-12 search-bar"
              size="large"
            />
          </div>
        </div>
      </div>
      <div className="align-center">
        <Button
          className="mg-r-20"
          type="primary"
          shape="round"
          size="large"
          style={{ float: "right" }}
          onClick={() => navigate("/posts/new")}
        >
          New Post
        </Button>
        <div
          className="cursor-pointer color-berry-80 mg-r-12 header-username align-center"
          onClick={usernameClick}
        >
          {userStore.currentUser.name || " SIGN IN / SIGN UP"}
        </div>
        <Avatar user={userStore.currentUser} goToProfile size="large" />
      </div>
    </div>
  );
}
