import {useContext} from "react";
import {Context} from "../../utils/Context";
import {Modal} from "@material-ui/core";
import SignForm from "./SignForm";

const SignInModal = () => {
    const {classes,signIn} = useContext(Context);
    const {openSignIn,setOpenSignIn} = signIn;
    return (
        <Modal
            open={openSignIn}
            onClose={() => setOpenSignIn(false)}
        >
            <div className={classes.paper}>
                <SignForm action="Sign In" />
            </div>
        </Modal>
    )
}

export default SignInModal;