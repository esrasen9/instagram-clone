import React from 'react';

const PostComments = ({comments}) => {
    return (
        <div className="post__comments">
            {
                comments.map((comment)=>{
                    const {username,text} = comment;
                    return (
                        <p>
                            <strong>{username}</strong>: {text}
                        </p>
                    )
                })
            }
        </div>
    );
}

export default PostComments;