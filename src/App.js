import './App.css';
import React, {useContext, useEffect} from "react";
import {Context} from "./utils/Context"
import {db, auth} from "./firebase";
import Posts from "./components/post/Posts";
import SignInModal from "./components/auth/SignInModal";
import SignUpModal from "./components/auth/SignUpModal";
import Header from "./components/header/Header";

function App() {
  const {postDetails,userDetails,usernameDetails} = useContext(Context);
  const {posts,setPosts} = postDetails;
  const {user,setUser} = userDetails;
  const {username} = usernameDetails;

  useEffect(() => {
        db.collection("posts")
            .orderBy("timestamp","desc")
            .onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => (
                {
                    post: doc.data(),
                    id: doc.id
                })));
        });
    }, []);

  useEffect(()=>{
      const handleSubscribe = auth.onAuthStateChanged((user)=>{
              if(user){
                  console.log(user);
                  setUser(user);
                  if(user.displayName){
                  }
                  else {
                      return user.updateProfile({
                          displayName: username
                      });
                  }
              }
              else {
                  setUser(null);
              }
          });
      return () => {
          handleSubscribe();
      }
  },[user,username])
    return (
        <div className="app">
            <SignInModal/>
            <SignUpModal/>
            <Header/>
            <Posts posts={posts}/>
        </div>
    );
}

export default App;
