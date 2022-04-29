import React from 'react'

const UserInfo = ({label, children}) => {
    return (
        <div className='userinfo'>
            <div className='label'>{label}</div>
            <div className='content'>{children}</div>
        </div>
    )
}

export default UserInfo