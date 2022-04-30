import React, { useState } from "react";
import { observer } from "mobx-react";
import { Editor } from "@/components";
import { Input, Button, Tag } from "antd";
import { useStoreAndAuth } from "@/utils";
const { CheckableTag } = Tag;

const tagsData = ["Movies", "Books", "Music", "Sports"];

const NewPost = observer(() => {
  let [title, setTitle] = useState("");
  let [selectedTags, setSelectedTags] = useState([]);
  const [body, setBody] = useState("");
  const { postStore } = useStoreAndAuth();

  const handleTagChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };


  return (
    <div className="white-container">
      <div className="align-center space-between mg-b-16">
        <span className="mg-r-12">Title: </span>
        <Input
          placeholder="Please enter your post title here..."
          size="large"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <Editor onChange={setBody} setContents={body} />
      <div className="align-center space-between mg-b-16 mg-t-16">
        <span className="mg-r-12">Tags: </span>
        <div>
          {tagsData.map((tag) => (
            <CheckableTag
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={(checked) => handleTagChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          ))}
        </div>
      </div>
      <Button type="primary" shape="round">
        Create
      </Button>
    </div>
  );
});

export default NewPost;
