import React, { useEffect } from "react";
import { Divider } from "antd";
import { Comments, AvatarActivity } from "@/components";
import { useStoreAndAuth } from "@/utils";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import moment from "moment";
const PostDetails = observer(() => {
  const { id } = useParams();
  const { postStore } = useStoreAndAuth();
  const { postDetail } = postStore;

  useEffect(() => {
    postStore.getPostDetail(id);
    return () => {};
  }, []);

  const activity = {
    user: postDetail.author,
    time: moment(postDetail.createdAt).format("MM/DD/YYYY"),
    action: "posted",
  };

  return (
    <div className="white-container" style={{ padding: "3vw" }}>
      <h3 className="mg-b-24">{postDetail.title}</h3>
      <AvatarActivity activity={activity} reverse />
      <Divider />
      <div style={{ minHeight: "55vh" }} dangerouslySetInnerHTML={{__html: postDetail.body}}></div>
      <div className="align-center color-base-60 fz-14">
        <div className="mg-r-24">BERRIES · {postDetail._count.berries}</div>
        <div>COMMENTS · {postDetail._count.comments}</div>
      </div>
      <Comments />
    </div>
  );
});

export default PostDetails;
