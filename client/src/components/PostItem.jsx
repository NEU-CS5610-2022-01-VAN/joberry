import React from "react";
import { useNavigate } from "react-router-dom";
import {Icon} from '@/components'
const PostItem = (props) => {
  const { post } = props;
  const navigate = useNavigate();
  const jumpToPost = () => {
    navigate(`/posts/${post.id}`);
  };
  return (
    <div className="post-item" key={post.id}>
      <div className="mg-r-32">
        <div
          onClick={jumpToPost}
          className="cursor-pointer"
          style={{ minHeight: "15vh" }}
        >
          <h4>{post.title}</h4>
          <div>{post.body}</div>
        </div>
        <div className="post-item-lower">
          <div className="mg-r-20">
            <Icon className="mg-r-8" type={"icon-berry-gray"} />
            {post._count?.berries || 0}
          </div>
          <div>
            <Icon className="mg-r-8" type={"icon-comment"} />
            {post._count?.comments || 0}
          </div>
        </div>
      </div>
      <div>{post.image ? <img src={post.image} alt="" /> : ""}</div>
    </div>
  );
};

export default PostItem