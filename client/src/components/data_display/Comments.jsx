import React, { useState } from "react";
import { Comment, Form, Button, List, Input, Divider } from "antd";
import moment from "moment";
import { observer } from "mobx-react";
import { useStoreAndAuth } from "@/utils";
import { Avatar } from "@/components";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} key={props.id} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        shape="round"
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const Comments = observer(() => {
  const { userStore, accessToken, commentStore, postStore } = useStoreAndAuth();
  const { commentList, postId } = commentStore;
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  
  const commentDisplay = commentList.map((comment) => ({
    id: comment.id,
    author: comment?.user?.name,
    avatar: <Avatar user={comment.user} />,
    content: <p>{comment.content}</p>,
    datetime: moment(comment.createdAt).format("MM/DD/YYYY hh:mm:ss"),
  }));

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    commentStore
      .createNewComment({ postId, content: value })
      .then(() => {
        setSubmitting(false);
        setValue("");
      })
      .then(() => {
        postStore.getPostDetail( postId );
      });
  };

  return (
    <div className="mg-t-24">
      <Divider />
      <div className="color-base-60">
        {commentDisplay.length} Comment{commentDisplay.length > 1 ? "s" : ""}
      </div>
      {commentDisplay.length > 0 && <CommentList comments={commentDisplay} />}
      {accessToken && (
        <Comment
          avatar={<Avatar user={userStore.currentUser} goToProfile />}
          content={
            <Editor
              onChange={(e) => setValue(e.target.value)}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      )}
    </div>
  );
});

export default Comments;
