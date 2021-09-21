import React,{useState} from 'react'
import {makeStyles} from "@material-ui/core";
import {auth} from "../firebase";
export const Context = React.createContext(null);

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: 24,
        padding: theme.spacing(2,4,3),
    }
}));
const Provider =  ({ children }) => {
    const classes = useStyles();
    const [addPhoto,setAddPhoto] = useState(false);
    const [posts,setPosts] = useState([]);
    const [openSignUp,setOpenSignUp] = useState(false);
    const [openSignIn,setOpenSignIn] = useState(false);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [user,setUser] = useState(null);

    const handleSignIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
            .catch((error)=>{
                alert(error.message);
                console.log(error);
            });
        setOpenSignIn(false);
    }
    const handleSignUp = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error)=>{
                alert(error.message);
                console.error(error);
            })
        setOpenSignUp(false);
    }

    const store = {
        classes: classes,
        postDetails: {posts, setPosts},
        signUp: {openSignUp, setOpenSignUp},
        signIn: {openSignIn, setOpenSignIn},
        usernameDetails: {username, setUsername},
        emailDetails: {email, setEmail},
        passwordDetails:  {password, setPassword},
        userDetails: {user,setUser},
        sharePhotoDetails: {addPhoto,setAddPhoto},
        handleSignIn,
        handleSignUp,
    }
    return(
        <Context.Provider value={store}>
            {children}
        </Context.Provider>);
}

export default Provider;