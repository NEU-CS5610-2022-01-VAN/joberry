import React from 'react';
import {Avatar} from '@/components'

const ProfileHeader = ({user}) => {
    return (
      <div className="white-container space-between" style={{ width: "100%", minHeight:"16vh" }}>
        <div className="align-center">
          <Avatar size={80} user={user} className="mg-r-12"></Avatar>
          <div>
            <h4>{user.name}</h4>
            <div className="color-base-60 fz-14" style={{ minHeight: "5vh" }}>{user.about}</div>
          </div>
        </div>
        <div></div>
      </div>
    );
}

export default ProfileHeader