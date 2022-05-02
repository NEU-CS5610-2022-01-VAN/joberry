import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Editor, $error } from "@/components";
import { Input, Button } from "antd";
import { useStoreAndAuth } from "@/utils";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = observer(() => {
  const [inputError, setInputError] = useState(false);
  const { postStore, userStore } = useStoreAndAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      postStore.getPostDetail(id).then(() => {
        if (postStore.postDetail.author.email !== userStore.currentUser.email) {
          return navigate("/404");
        }
      });
    } else {
      clearEditor();
    }
    return () => {};
  }, [id]);

  const clearEditor = () => {
    postStore.updateBody("");
    postStore.updateTitle("");
  };

  const handleError = () => {
    if (!postStore.title) return setInputError(true);
    if (!postStore.body) return $error("Please enter content for your post!");
  };

  const handleConfirm = () => {
    handleError();
    const params = {
      title: postStore.title,
      body: postStore.body,
    };
    if (id) {
      postStore.updatePost({ ...params, id }).then(() => {
        clearEditor();
        navigate(`/posts/${id}`);
      });
    } else {
      postStore.createNewPost(params).then(() => {
        clearEditor();
        postStore.postDetail.id &&
          navigate(`/posts/${postStore.postDetail.id}`);
      });
    }
  };

  return (
    <div className="white-container">
      <div className="align-center space-between mg-b-16">
        <span className="mg-r-12">Title: </span>
        <div style={{ width: "100%" }}>
          <Input
            placeholder="Please enter your post postStore.title here..."
            size="large"
            value={postStore.title}
            onChange={(e) => {
              if (e.target.value) setInputError(false);
              postStore.updateTitle(e.target.value);
            }}
            required
            status={inputError ? "error" : ""}
          />
          {inputError ? (
            <span className="color-error">Please enter a postStore.title!</span>
          ) : (
            ""
          )}
        </div>
      </div>
      <Editor
        onChange={(content) => postStore.updateBody(content)}
        setContents={postStore.body}
        defaultValue={postStore.body}
      />
      {/* <div className="align-center space-between mg-b-16 mg-t-16">
        {tagsData.length > 0 ? <span className="mg-r-12">Tags: </span> : ""}
        <div>
          {tagsData.map((tag) => (
            <CheckableTag
              key={tag.id}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={(checked) => handleTagChange(tag, checked)}
            >
              {tag.name}
            </CheckableTag>
          ))}
        </div>
      </div> */}
      <Button
        type="primary"
        shape="round"
        size="large"
        className="mg-r-8 mg-t-16"
        onClick={handleConfirm}
      >
        {id ? "Confirm" : "Create"}
      </Button>
      <Button shape="round" size="large" onClick={() => navigate("/")}>
        Cancel
      </Button>
    </div>
  );
});

export default EditPost;
