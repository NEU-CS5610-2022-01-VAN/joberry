import React from "react";
import { UserInfo } from "@/components";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { Button } from "antd";

export default function ProfileSettings() {
  return (
    <div className="white-container">
      <div className="maininfo">
        <div>
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
        <div style={{ fontSize: "18px" }}>USER NAME</div>
        <div>
          <Button shape="circle" icon={<EditOutlined />} />
        </div>
      </div>
      <div>
        <UserInfo label="GENDER">MALE</UserInfo>
        <Divider />
        <UserInfo label="EMAIL">abc123@gmail.com</UserInfo>
        <Divider />
        <UserInfo label="OCCUPATION">student</UserInfo>
        <Divider />
        <UserInfo label="COMPANY">Northeastern University</UserInfo>
        <Divider />
        <UserInfo label="ABOUT">2021 fall</UserInfo>
      </div>
      <div className="logout-btn">
        <Button type="primary" shape="round">
          LOG OUT
        </Button>
      </div>
    </div>
  );
}
