import React, {useContext} from 'react';
import logo from "../../images/logo.svg.png";
import {Button, Input} from "@material-ui/core";
import {Context} from "../../utils/Context";

const SignForm = ({action}) =>  {

    const {emailDetails,passwordDetails,usernameDetails,handleSignIn,handleSignUp} = useContext(Context);
    const {username,setUsername} = usernameDetails;
    const {email,setEmail} = emailDetails;
    const {password,setPassword} = passwordDetails;

    return (
        <form className="form">
            <img
                src={logo}
                alt="logo"
                className="modal__image app__logo"
            />
            {
                action === "Sign Up" && <Input
                    className="form__input"
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />
            }
            <Input
                className="form__input"
                placeholder="email"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />
            <Input
                className="form__input"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <Button
                type="submit"
                onClick={action==="Sign In" ? handleSignIn :handleSignUp}>{action}
            </Button>
        </form>
    );
}

export default SignForm;