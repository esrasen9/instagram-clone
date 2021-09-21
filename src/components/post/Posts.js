import React from 'react';
import Post from "./Post";
import Feed from "instagram-feed-embed";

const Posts = ({posts}) => {
    const recommendedAccounts = ["nasa","puppysearth","javascript.js","spacex","barked"];
    return (
        <div className="posts">
            <div className="posts__left">
                {
                    posts.map((post) => {
                        const {id} = post;
                        const {username,imageSource,caption} = post.post;
                        return(
                            <Post
                                key={id}
                                postId={id}
                                username={username}
                                imageSource={imageSource}
                                caption={caption}
                            />);
                    })
                }
            </div>
            <div className="posts__right">
                {
                    recommendedAccounts.map((account)=>{
                        return (
                            <Feed
                                userName={account}
                                limit={1}
                                maxWidth={320}
                                maxContainerHeight={500}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Posts;