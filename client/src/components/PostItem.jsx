import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon, $error } from "@/components";
import { observer } from "mobx-react";
import { useStoreAndAuth } from "@/utils";

const PostItem = observer((props) => {
  const { userStore, berryStore, accessToken } = useStoreAndAuth();
  const { currentUser } = userStore;
  const { post } = props;
  const navigate = useNavigate();
  const { berries } = post;
  const berry = berries && berries.find((item) => (item.user.email === currentUser.email));
  const hasBerry = berries && berries.length > 0 && berry;

  const jumpToPost = () => navigate(`/posts/${post.id}`);

  const handleBerryClick = () => {
    if (!accessToken) {
     return $error("Login required to give a berry~");
    }
    if (hasBerry) {
      berryStore
        .deleteBerry(berry.id)
        .then(() => props.berryCallback());
    } else {
      berryStore
        .createNewBerry({ postId: post.id })
        .then(() => props.berryCallback());
    }
  };

  return (
    <div className="post-item" key={post.id}>
      <div className="mg-r-32 mg-t-16">
        <div style={{ minHeight: "20vh" }}>
          <h4 className="cursor-pointer" onClick={jumpToPost}>
            {post.title}
          </h4>
          <div
            className="cursor-pointer show-ellipsis" 
            style={{height:"10vh", width:"60vw"}}
            onClick={jumpToPost}
            dangerouslySetInnerHTML={{ __html: post.body }}
          ></div>
        </div>
        <div className="post-item-lower">
          <div className="mg-r-20 cursor-pointer" onClick={handleBerryClick}>
            <Icon
              className="mg-r-8 "
              type={hasBerry ? "icon-berry-pink" : "icon-berry-gray"}
            />
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
});

export default PostItem;
