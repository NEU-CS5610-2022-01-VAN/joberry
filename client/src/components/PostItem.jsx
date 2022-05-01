import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@/components";
const PostItem = (props) => {
  const { post } = props;
  const navigate = useNavigate();
  const jumpToPost = () => {
    navigate(`/posts/${post.id}`);
  };
  return (
    <div className="post-item" key={post.id}>
      <div className="mg-r-32 show-ellipsis">
        <div style={{ minHeight: "15vh" }}>
          <h4 className="cursor-pointer" onClick={jumpToPost}>
            {post.title}
          </h4>
          <div
            className="cursor-pointer"
            onClick={jumpToPost}
            dangerouslySetInnerHTML={{ __html: post.body }}
          ></div>
        </div>
        <div className="post-item-lower">
          <div className="mg-r-20 cursor-pointer">
            <Icon className="mg-r-8 " type={"icon-berry-gray"} />
            {post._count?.berries || 0}
          </div>
          <div className="cursor-pointer">
            <Icon
              className="mg-r-8 "
              type={"icon-comment"}
              onClick={jumpToPost}
            />
            {post._count?.comments || 0}
          </div>
        </div>
      </div>
      <div>{post.image ? <img src={post.image} alt="" /> : ""}</div>
    </div>
  );
};

export default PostItem;
