import React, { useEffect } from "react";
import { Divider, Popconfirm } from "antd";
import { Comments, AvatarActivity, Icon, Loading } from "@/components";
import { useStoreAndAuth } from "@/utils";
import { observer } from "mobx-react";
import { useNavigate, useParams } from "react-router-dom";

const PostDetails = observer(() => {
  const { id } = useParams();
  const { postStore, userStore, berryStore } = useStoreAndAuth();
  const { postDetail } = postStore;
  const { currentUser } = userStore;
  const berry =
    postDetail.berries &&
    postDetail.berries.find((item) => item.user.email === currentUser.email);
  const hasBerry = postDetail.berries && postDetail.berries.length > 0 && berry;

  useEffect(() => {
    postStore.getPostDetail(id);
    return () => {};
  }, []);

  const activity = {
    user: postDetail.author,
    time: postDetail.createdAt,
    action: "posted",
  };
  const navigate = useNavigate();
  const confirmDelete = () => {
    postStore.deletePost(id).then(() => {
      navigate("/home");
    });
  };
  const toggleBerry = () => {
    if (hasBerry) {
      berryStore.deleteBerry(berry.id).then(() => postStore.getPostDetail(id));
    } else {
      berryStore
        .createNewBerry({ postId: id })
        .then(() => postStore.getPostDetail(id));
    }
  };

  return (
    <div className="white-container" style={{ padding: "3vw" }}>
      {postStore.loading ? (
        <Loading />
      ) : (
        <>
          <h3 className="mg-b-24">{postDetail.title}</h3>
          <div className="space-between">
            <AvatarActivity activity={activity} reverse />
            {postDetail.author.email === currentUser.email ? (
              <div className="display-flex">
                <small
                  onClick={() => navigate(`/posts/edit/${id}`)}
                  className="fz-14 mg-r-12 color-berry-100 cursor-pointer"
                >
                  edit
                </small>
                <Popconfirm
                  title="Are you sure you want to delete?"
                  onConfirm={confirmDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <small className="fz-14 color-berry-100 cursor-pointer">
                    delete
                  </small>
                </Popconfirm>
              </div>
            ) : (
              ""
            )}
          </div>
          <Divider />
          <div
            style={{ minHeight: "55vh" }}
            dangerouslySetInnerHTML={{ __html: postDetail.body }}
          ></div>
          <div className="align-center color-base-60 fz-14 mg-t-80">
            <div className="mg-r-24">
              <Icon
                className="mg-r-8 cursor-pointer"
                type={hasBerry ? "icon-berry" : "icon-berry-gray"}
                onClick={toggleBerry}
              />
              BERRIES · {postDetail._count.berries}
            </div>
            <div className="cursor-defualt">
              COMMENTS · {postDetail._count.comments}
            </div>
          </div>
          <Comments />
        </>
      )}
    </div>
  );
});

export default PostDetails;
