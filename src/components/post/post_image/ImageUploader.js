import React,{useState} from 'react'
import {Button} from "@material-ui/core";
import {db,storage} from "../../../firebase";
import firebase from "firebase";
const ImageUploader = ({username}) => {
    const [caption,setCaption] = useState("");
    const [progress,setProgress] = useState(0);
    const [image,setImage] = useState(null);

    const handleFileChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = () => {
        const upload =
            storage.ref(`images/${image.name}`).put(image);
        upload.on("state_changed",
            (snapshot)=>{
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress);
            },
            (err)=> {
                alert(err.message);
                console.error(err)
            },
            () => {
                storage.ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>{
                        //add post inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            imageSource: url,
                            caption,
                            username
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    });
            }
        )
    }

    return (
        <div className="image__uploader">
            <progress
                className="image__uploader__progress"
                value={progress.toString()}
                max="100"/>
            <input
                className="image__uploader__input"
                type="text"
                placeholder="Enter a caption..."
                onChange={(e)=>setCaption(e.target.value)}
                value={caption}/>
            <input
                className="image__uploader__input"
                type="file"
                onChange={handleFileChange}
            />
            <Button
                onClick={handleUpload}>Upload</Button>
        </div>
    );
}

export default ImageUploader;