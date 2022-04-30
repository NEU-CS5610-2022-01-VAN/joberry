import React from 'react';
import { Divider } from 'antd';
import { Comment } from '@/components'
import { AddComment } from '@/components';

export default function PostDetails() {
    return (
        <div>
            <div className='post-title'>POST TITLE</div>
            <Divider />
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, placeat quasi quod impedit ipsa blanditiis saepe distinctio iure rerum perspiciatis, a porro, deleniti at dolore? Sapiente, modi. Nemo, vitae eveniet.
            </div>
            <div>

            </div>
            <Divider />
            <div>
                
            </div>
            <div>
                <Comment>
                    <Comment>
                        <Comment></Comment>
                        <Comment></Comment>
                    </Comment>
                </Comment>
            </div>
            <div>
                <AddComment></AddComment>
            </div>
        </div>
    )
}