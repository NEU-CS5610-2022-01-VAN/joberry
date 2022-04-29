import React from "react";
import { Avatar, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { PostItem } from "@/components";

export default function Home() {


  const post = {
    title:
      "Just got an interview with AMAZIN and GEEGLE, let me share my experiences",
    content:
      "<div>Chenru Wu: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in mattis purus, eget maximus urna. Duis pulvinar non nunc id rhoncus. Suspendisse mi leo, hendrerit sit amet volutpat eget, imperdiet ut leo. Morbi ac pellentesque leo. Vivamus varius mauris sit amet malesuada placerat. </div>",
  };
  return (
    <>
      <div className="white-container">
        <div className="display-flex">
          <Avatar
            className="cursor-pointer mg-r-16"
            icon={<UserOutlined />}
            size="large"
          />
          <div style={{ width: "98%" }}>
            <Input.TextArea
              placeholder="Start new post here ..."
              className="mg-r-12 input mg-b-12"
              autoSize={{ minRows: 3.5, maxRows: 3.5 }}
            />
            <Button
              shape="round"
              type="primary"
              style={{ float: "right" }}
              size="large"
            >
              Make Post
            </Button>
          </div>
        </div>
      </div>
      <div className="white-container mg-t-12">
        <PostItem post={post}/>
      </div>
    </>
  );
}
