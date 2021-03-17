import React from "react";
import {Login} from "../../components/Login/Login";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";

type PropsType = {}

export const LoginPage: React.FC<PropsType> = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return (
        <div>
            <Login/>
        </div>
    )
}