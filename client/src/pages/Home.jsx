import React, { useEffect } from "react";
import { Avatar, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { PostItem } from "@/components";
import { observer } from "mobx-react";
import { useStoreAndAuth } from "@/utils";

const Home = observer(() => {
  const { postStore } = useStoreAndAuth();
  const { accessToken } = useStoreAndAuth();

  useEffect(() => {
    if (accessToken) postStore.getAllPosts();
    return () => {};
  }, [accessToken]);

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
        {postStore.postList.map((item) => (
          <PostItem post={item} key={item.id} />
        ))}
      </div>
    </>
  );
});
export default Home;
