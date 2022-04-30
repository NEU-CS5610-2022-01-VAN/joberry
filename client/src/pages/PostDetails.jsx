import React from 'react';
import { Divider } from 'antd';
import { Comment } from '@/components'
import { AddComment } from '@/components';

export default function PostDetails() {
    return (
        <div className='white-container'>
            <div className='post-title'>POST TITLE</div>
            <Divider />
            <div className='post-content'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, placeat quasi quod impedit ipsa blanditiis saepe distinctio iure rerum perspiciatis, a porro, deleniti at dolore? Sapiente, modi. Nemo, vitae eveniet.
            </div>
            <div className='post-stat'>
                <div className='post-berries'>
                    BERRIES · {121}
                </div>
                <div>
                    COMMENTS · {5}
                </div>
            </div>
            <Divider />
            <div className='comments'>
                <div className='comment-stat'>
                    Comments · {5}
                </div>
                <div className='comments-set'>
                    <Comment>
                        <Comment>
                            <Comment></Comment>
                            <Comment></Comment>
                        </Comment>
                    </Comment>
                </div>
                <div className='comment-adder'>
                    <AddComment></AddComment>
                </div>
            </div>
        </div>
    )
}