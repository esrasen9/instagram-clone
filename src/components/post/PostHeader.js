import React from 'react';
import Avatar from "@material-ui/core/Avatar";
const PostHeader = ({username,imageSource}) => {
    return (
        <>
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                />
                <h3>{username}</h3>
            </div>
            <img src={imageSource}
                 alt="New post"
                 className="post__image"
            />
        </>
    );
}

export default PostHeader;