import React,{useContext} from 'react';
import {Modal} from "@material-ui/core";
import {Context} from "../../../utils/Context";
import ImageUploader from "./ImageUploader";
const SharePhotoModal = () =>  {
    const {sharePhotoDetails,userDetails,classes} = useContext(Context);
    const {addPhoto,setAddPhoto} = sharePhotoDetails;
    const {user} = userDetails;
    return (
        <Modal
            open={addPhoto}
            onClose={()=>setAddPhoto(false)}
        >
            <div className={classes.paper}>
                {
                    addPhoto && user?.displayName
                        ? <ImageUploader username={user.displayName}/>
                        : <h1>You need to be logged in to share a post!</h1>
                }
            </div>
        </Modal>
    );
}

export default SharePhotoModal;