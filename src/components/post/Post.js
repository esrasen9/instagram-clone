import React,{useState,useEffect,useContext} from 'react';
import {db} from "../../firebase";
import {Context} from "../../utils/Context";
import firebase from "firebase";
import PostHeader from "./PostHeader";
import PostComments from "./post_comments/PostComments";
import PostCommentForm from "./post_comments/PostCommentForm";

const Post = ({username,imageSource,caption,postId}) => {
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState("");
    const {userDetails} = useContext(Context);
    const {user} = userDetails;
    const handleSubmitComment = (e) => {
        if(e.key ==="Enter"){
            db.collection("posts")
                .doc(postId)
                .collection("comments")
                .add({
                    text: comment,
                    username: user.displayName,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            setComment("");
        }
    }
    useEffect(() =>{
        let handleComment;
        if(postId){
             handleComment =
                db.collection("posts")
                    .doc(postId)
                    .collection("comments")
                    .orderBy("timestamp","asc")
                    .onSnapshot((snapshot) => {
                        setComments(snapshot.docs.map((doc) => doc.data()));
                    });

        }
        return () => {
            handleComment();
        }
    },[postId]);
    return (
        <div className="post">
            <PostHeader username={username} imageSource={imageSource}/>
            {/*username + caption */}
            <h4 className="post__text"><strong>{username}</strong>: {caption} </h4>
            <PostComments comments={comments}/>
            {
                user &&  <PostCommentForm
                    handleSubmitComment={handleSubmitComment}
                    comment={comment}
                    setComment={setComment}
                />
            }
        </div>
    );
}

export default Post;