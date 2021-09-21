import logo from "../../images/logo.svg.png";
import {Button} from "@material-ui/core";
import {BsPlusSquare} from "react-icons/bs";
import {BiLogOut,BiLogIn} from "react-icons/bi";
import SharePhotoModal from "../post/post_image/SharePhotoModal";
import React,{useContext} from "react";
import {Context} from "../../utils/Context";
import {auth} from "../../firebase";
const Header = () => {
    const {sharePhotoDetails,userDetails,signUp} = useContext(Context);
    const {setAddPhoto} = sharePhotoDetails;
    const {setOpenSignUp} = signUp;
    const {user} = userDetails;
    return (
        <div className="header">
            <img
                src={logo}
                alt="logo"
                className="app__logo"
            />
            <div className="app__header__buttons">
                {
                    user ?
                        <Button onClick={() => auth.signOut()}>
                            <BiLogOut size="30"/>
                        </Button>
                        :(
                            <div className="app__login">
                                <Button onClick={() => setOpenSignUp(true)}>
                                    <BiLogIn size="30"/>
                                </Button>
                            </div>
                        )
                }
                <Button
                    onClick={()=>setAddPhoto(true)}
                    className="app__add__button">
                    <BsPlusSquare
                        className="app__add__icon"
                        icon="fa-solid fa-square-plus"
                        size="30"
                    />
                </Button>
            </div>
            <SharePhotoModal/>
        </div>
    );
}
export default Header;