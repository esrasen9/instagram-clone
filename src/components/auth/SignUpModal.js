import React, {useContext} from "react";
import {Context} from "../../utils/Context";
import {Button, Modal} from "@material-ui/core";
import SignForm from "./SignForm";

const SignUpModal = () => {
    const {classes,signUp,signIn} = useContext(Context);
    const {openSignUp,setOpenSignUp} = signUp
    const {setOpenSignIn} = signIn;

    const handleSignIn = () => {
        setOpenSignIn(true);
        setOpenSignUp(false);
    }

    return (
        <Modal
            open={openSignUp}
            onClose={() => setOpenSignUp(false)}
        >
            <div className={classes.paper}>
                <SignForm action="Sign Up"/>
                <div className="modal__sign_in__router">
                    <p>Already have an account?</p>
                    <Button onClick={handleSignIn}>Sign In</Button>
                </div>
            </div>
        </Modal>
    )
}

export default SignUpModal;