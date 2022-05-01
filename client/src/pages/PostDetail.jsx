import React, { useEffect } from "react";
import { Divider } from "antd";
import { Comments, AvatarActivity, Icon } from "@/components";
import { useStoreAndAuth } from "@/utils";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";

const PostDetails = observer(() => {
  const { id } = useParams();
  const { postStore, berryStore, userStore } = useStoreAndAuth();
  const { postDetail } = postStore;
  const berry = postDetail.berries.find(
    (item) => item.user.email === userStore.currentUser.email
  );
  const hasBerry = postDetail.berries.length > 0 && berry;
  useEffect(() => {
    postStore.getPostDetail(id);
    return () => {};
  }, []);

  const activity = {
    user: postDetail.author,
    time: postDetail.createdAt,
    action: "posted",
  };

  return (
    <div className="white-container" style={{ padding: "3vw" }}>
      <h3 className="mg-b-24">{postDetail.title}</h3>
      <AvatarActivity activity={activity} reverse />
      <Divider />
      <div
        style={{ minHeight: "55vh" }}
        dangerouslySetInnerHTML={{ __html: postDetail.body }}
      ></div>
      <div className="align-center color-base-60 fz-14">
        <div className="mg-r-24">
          <Icon
            className="mg-r-8 "
            type={hasBerry ? "icon-berry" : "icon-berry-gray"}
          />
          BERRIES · {postDetail._count.berries}
        </div>
        <div className="cursor-defualt">
          COMMENTS · {postDetail._count.comments}
        </div>
      </div>
      <Comments />
    </div>
  );
});

export default PostDetails;
