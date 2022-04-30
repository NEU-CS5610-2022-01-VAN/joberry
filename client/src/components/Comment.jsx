import React from 'react'
import { Comment  } from 'antd';
import { Avatar } from '@/components';

const ExampleComment = ({ comment }) => (
  <Comment
    author={comment.user.name}
    // avatar={<Avatar user={comment.user}  />}
    content={<p>{comment.content}</p>}>
  </Comment>
);

export default ExampleComment