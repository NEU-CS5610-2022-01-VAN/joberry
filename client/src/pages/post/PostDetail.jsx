import React, { useEffect } from "react";
import { Divider, Popconfirm } from "antd";
import { Comments, AvatarActivity, Icon, Loading, $error } from "@/components";
import { useStoreAndAuth } from "@/utils";
import { observer } from "mobx-react";
import { useNavigate, useParams } from "react-router-dom";

const PostDetails = observer(() => {
  const { id } = useParams();
  const { postStore, userStore, berryStore, accessToken } = useStoreAndAuth();
  const { currentUser } = userStore;
  const berry =
    postStore.postDetail &&
    postStore.postDetail.berries &&
    postStore.postDetail.berries.find(
      (item) => item.user.email === currentUser.email
    );
  const hasBerry =
    postStore.postDetail &&
    postStore.postDetail.berries &&
    postStore.postDetail.berries.length > 0 &&
    berry;

  useEffect(() => {
    postStore.getPostDetail(id);
    return () => {};
  }, []);

  const activity = {
    user: postStore.postDetail.author,
    time: postStore.postDetail.createdAt,
    action: "posted",
  };
  const navigate = useNavigate();
  const confirmDelete = () => {
    postStore.deletePost(id).then(() => {
      navigate("/home");
    });
  };
  const toggleBerry = () => {
    if (!accessToken) {
      return $error("Please sign in to give a berry~");
    }
    if (hasBerry) {
      berryStore.deleteBerry(berry.id).then(() => postStore.getPostDetail(id));
    } else {
      berryStore
        .createNewBerry({ postId: id })
        .then(() => postStore.getPostDetail(id));
    }
  };
  const handleEdit = () => {
    postStore.updateBody(postStore.postDetail.body);
    postStore.updateTitle(postStore.postDetail.title);
    navigate(`/posts/edit/${id}`);
  };

  return (
    <div className="white-container" style={{ padding: "3vw" }}>
      {postStore.loading ? (
        <Loading />
      ) : (
        <>
          <h3 className="mg-b-24">{postStore.postDetail.title}</h3>
          <div className="space-between">
            {activity && <AvatarActivity activity={activity} reverse />}
            {postStore.postDetail.author &&
            postStore.postDetail.author.email === currentUser.email ? (
              <div className="display-flex">
                <small
                  onClick={handleEdit}
                  className="fz-14 mg-r-12 color-berry-100 cursor-pointer"
                >
                  EDIT
                </small>
                <Popconfirm
                  title="Are you sure you want to delete?"
                  onConfirm={confirmDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <small className="fz-14 color-berry-100 cursor-pointer">
                    DELETE
                  </small>
                </Popconfirm>
              </div>
            ) : (
              ""
            )}
          </div>
          <Divider />
          <div
            dangerouslySetInnerHTML={{ __html: postStore.postDetail.body }}
          ></div>
          <div className="align-center color-base-60 fz-14 mg-t-80">
            <div className="mg-r-24">
              <Icon
                className="mg-r-8 cursor-pointer"
                type={hasBerry ? "icon-berry" : "icon-berry-gray"}
                onClick={toggleBerry}
              />
              BERRIES · {postStore.postDetail._count.berries}
            </div>
            <div className="cursor-defualt">
              COMMENTS · {postStore.postDetail._count.comments}
            </div>
          </div>
          <Comments />
        </>
      )}
    </div>
  );
});

export default PostDetails;
