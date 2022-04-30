import React, { useEffect } from 'react';
import { Divider } from 'antd';
import { Comment, AddComment, AvatarActivity } from "@/components";
import { useStoreAndAuth } from "@/utils";
import { observer } from "mobx-react";
import { useParams } from 'react-router-dom';

const PostDetails = observer(() => {
    const {id} = useParams() 
    const { postStore } = useStoreAndAuth();
    const {postDetail} = postStore;

    useEffect(() => {
        postStore.getPostDetail(id);
        return () => {};
      }, []);

    const date = new Date(postDetail.createdAt);
    const activity = {
        user: {
            name: `${postDetail.author.name}`
        },
        time: `${date.getUTCMonth()+1}/${date.getDate()}/${date.getFullYear()}`,
        action: "posted",
    }

    return (
        <div className='white-container'>
            <div className='post-title'>{postDetail.title}</div>
            <div className='avatar-activity'><AvatarActivity activity={activity} reverse /></div>
            <Divider />
            <div className='post-content'>
                {postDetail.body}
            </div>
            <div className='post-stat'>
                <div className='post-berries'>
                    BERRIES · {postDetail._count.berries}
                </div>
                <div>
                    COMMENTS · {postDetail._count.comments}
                </div>
            </div>
            <Divider />
            <div className='comments'>
                <div className='comment-stat'>
                    Comments · {postDetail._count.comments}
                </div>
                <div className='comments-set'>
                    {postDetail.comments.map(item=> <Comment key={item.id} comment={item}/>)}
                </div>
                <div className='comment-adder'>
                    <AddComment/>
                </div>
            </div>
        </div>
    )
})

export default PostDetails