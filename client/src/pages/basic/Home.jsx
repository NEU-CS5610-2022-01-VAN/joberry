import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { Avatar, PostItem, NewPostModal, Loading } from "@/components";
import { observer } from "mobx-react";
import { useStoreAndAuth } from "@/utils";

const Home = observer(() => {
  const { postStore, userStore } = useStoreAndAuth();
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    postStore.getAllPosts();
    return () => {};
  }, []);

  const fetchAllPosts = () => postStore.getAllPosts();

  const onContentChange = (e) => setContent(e.target.value);

  const showPostPop = () => setVisible(true);

  const cancelPop = () => {
    setContent("");
    setVisible(false);
    fetchAllPosts();
  };

  return (
    <>
      {userStore.loggedIn ? (
        <div className="white-container">
          <div className="display-flex">
            <Avatar
              className="cursor-pointer mg-r-16"
              size="large"
              user={userStore.currentUser}
              style={{ marginTop: "-9vh" }}
              goToProfile
            />
            <div style={{ width: "98%" }}>
              <Input.TextArea
                placeholder="Start new post here ..."
                className="mg-r-12 input mg-b-12"
                autoSize={{ minRows: 3.5, maxRows: 3.5 }}
                onChange={onContentChange}
                value={content}
              />
              <Button
                shape="round"
                type="primary"
                style={{ float: "right" }}
                size="large"
                onClick={showPostPop}
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
        <div style={{ marginTop: "-1.5vh" }}>
          {postStore.loading ? (
            <Loading />
          ) : (
            postStore.postList.map((item) => (
              <PostItem
                post={item}
                key={item.id}
                berryCallback={fetchAllPosts}
              />
            ))
          )}
        </div>
      </div>

      <NewPostModal visible={visible} content={content} cancelPop={cancelPop} />
    </>
  );
});
export default Home;
