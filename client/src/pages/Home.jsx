import React, { useEffect } from "react";
import { Input, Button } from "antd";
import { Avatar, PostItem } from "@/components";
import { observer } from "mobx-react";
import { useStoreAndAuth } from "@/utils";

const Home = observer(() => {
  const { postStore, userStore } = useStoreAndAuth();

  useEffect(() => {
    postStore.getAllPosts();
    return () => {};
  }, []);

  return (
    <>
      {userStore.loggedIn ? (
        <div className="white-container">
          <div className="display-flex">
            <Avatar
              className="cursor-pointer mg-r-16"
              size="large"
              user={userStore.currentUser}
              style={{marginTop:"-9vh"}}
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
      ) : (
        ""
      )}
      <div className="white-container mg-t-12">
        <div style={{marginTop:"-1.5vh"}}>
          {postStore.postList.map((item) => (
            <PostItem post={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
});
export default Home;
