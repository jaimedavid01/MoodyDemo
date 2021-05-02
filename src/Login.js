import React from 'react'
import { Button } from "@material-ui/core";
import "./Login.css"
import { auth, provider } from './firebase';
import {actionTypes} from './Reducer'
import { useStateValue } from './StateProvider';
import Logo from "./img/Moody2png.png"
import Logo2 from "./img/MoodyLogo2.png"


function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch((err) => alert(err.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src={Logo}
                alt="Moody"
                />
                
                <div className="login__text">
                <img className="signin avatar" src={Logo2}
                alt="Moody"
                />
                </div>
                
                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
