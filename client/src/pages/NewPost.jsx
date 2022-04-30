import React, { useState } from "react";
import { observer } from "mobx-react";
import { Editor, $error } from "@/components";
import { Input, Button, Tag } from "antd";
import { useStoreAndAuth } from "@/utils";
import { useNavigate } from "react-router-dom";
const { CheckableTag } = Tag;

const tagsData = [{id:1, name: "Movies"}, {id:2, name: "Books"}, {id:3, name: "Music"}, {id: 4, name:"Sports"}];

const NewPost = observer(() => {
  let [title, setTitle] = useState("");
  let [selectedTags, setSelectedTags] = useState([]);
  const [body, setBody] = useState("");
  const [inputError, setInputError] = useState(false);
  const { postStore } = useStoreAndAuth();
  const navigate = useNavigate();

  const handleTagChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t.id !== tag.id);
    setSelectedTags(nextSelectedTags);
  };

  const createNewPost = () => {
    if (!title) return setInputError(true);
    if (!body) return $error("Please enter content for your post!");
    const params = {
      title,
      body,
      tagIds: selectedTags.map(tag=>tag.id),
    };
    postStore.createNewPost(params);
  };

  return (
    <div className="white-container">
      <div className="align-center space-between mg-b-16">
        <span className="mg-r-12">Title: </span>
        <div style={{ width: "100%" }}>
          <Input
            placeholder="Please enter your post title here..."
            size="large"
            value={title}
            onChange={(e) => {
              if (e.target.value) setInputError(false);
              setTitle(e.target.value);
            }}
            required
            status={inputError ? "error" : ""}
          />
          {inputError ? (
            <span className="color-error">Please enter a title!</span>
          ) : (
            ""
          )}
        </div>
      </div>
      <Editor onChange={setBody} setContents={body} />
      <div className="align-center space-between mg-b-16 mg-t-16">
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
      </div>
      <Button
        type="primary"
        shape="round"
        size="large"
        className="mg-r-8"
        onClick={createNewPost}
      >
        Create
      </Button>
      <Button shape="round" size="large" onClick={() => navigate(-1)}>
        Cancel
      </Button>
    </div>
  );
});

export default NewPost;
