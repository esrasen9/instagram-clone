import React from 'react';

const PostCommentForm = ({handleSubmitComment,comment,setComment}) => {
    return (
        <form
            onSubmit={(e)=> e.preventDefault()}
            onKeyPress={handleSubmitComment}
            className="post__comment__form">
            <input
                className="post__comment__input"
                type="text"
                value={comment}
                onChange={(e)=> setComment(e.target.value)}
                placeholder="Add a comment..."
            />
        </form>
    );
}

export default PostCommentForm;